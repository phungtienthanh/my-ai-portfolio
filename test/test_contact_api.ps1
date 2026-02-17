#!/usr/bin/env pwsh
# Contact Form API Test Suite - Phase 1

$API_URL = "http://localhost:3000/api/contact"

Write-Host "`n========== Phase 1 Contact API Security Tests ==========" -ForegroundColor Cyan

# TEST 1: Valid Request
Write-Host "`nTEST 1: Valid Request with XSS Payload" -ForegroundColor Green
Write-Host "Expected: 200 OK, message escaped" -ForegroundColor Gray

$body = @{
    name = "Test User"
    email = "phungtienthanh2004@gmail.com"
    message = "Test message with HTML: bold tags and script"
    phone = ""
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri $API_URL `
    -Method POST `
    -Headers @{
        "Origin" = "http://localhost:3000"
        "Content-Type" = "application/json"
    } `
    -Body $body `
    -ErrorAction SilentlyContinue

if ($response.StatusCode -eq 200) {
    Write-Host "PASS: Status 200 OK" -ForegroundColor Green
    $json = $response.Content | ConvertFrom-Json
    Write-Host $json.message -ForegroundColor Green
} else {
    Write-Host "FAIL: Status $($response.StatusCode)" -ForegroundColor Red
    Write-Host "Response: $($response.Content)" -ForegroundColor Yellow
}

# TEST 2: Blocked CORS
Write-Host "`nTEST 2: Blocked CORS Origin (evil.com)" -ForegroundColor Green
Write-Host "Expected: 403 Forbidden" -ForegroundColor Gray

$body = @{
    name = "Hacker"
    email = "hack@evil.com"
    message = "Spam attempt"
    phone = ""
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $API_URL `
        -Method POST `
        -Headers @{
            "Origin" = "http://evil.com"
            "Content-Type" = "application/json"
        } `
        -Body $body `
        -ErrorAction Stop
    Write-Host "FAIL: Should have been blocked" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 403) {
        Write-Host "PASS: Status 403 Forbidden" -ForegroundColor Green
    } else {
        Write-Host "FAIL: Status $statusCode (expected 403)" -ForegroundColor Red
    }
}

# TEST 3: Validation Error
Write-Host "`nTEST 3: Validation Error (invalid email)" -ForegroundColor Green
Write-Host "Expected: 400 Bad Request with details" -ForegroundColor Gray

$body = @{
    name = "Test"
    email = "not-an-email"
    message = "Valid message here"
    phone = ""
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $API_URL `
        -Method POST `
        -Headers @{
            "Origin" = "http://localhost:3000"
            "Content-Type" = "application/json"
        } `
        -Body $body `
        -ErrorAction Stop
    
    if ($response.StatusCode -eq 200) {
        Write-Host "FAIL: Should have failed validation" -ForegroundColor Red
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 400) {
        Write-Host "PASS: Status 400 Bad Request" -ForegroundColor Green
        $content = $_.Exception.Response.Content.ReadAsStream() | ForEach-Object { [System.IO.StreamReader]::new($_).ReadToEnd() }
        Write-Host $content -ForegroundColor Yellow
    } else {
        Write-Host "FAIL: Status $statusCode (expected 400)" -ForegroundColor Red
        try {
            $content = $_.Exception.Response.Content.ReadAsStream() | ForEach-Object { [System.IO.StreamReader]::new($_).ReadToEnd() }
            Write-Host "Error response: $content" -ForegroundColor Yellow
        } catch {
            Write-Host "Could not read error response" -ForegroundColor Gray
        }
    }
}

# TEST 4: Rate Limiting
Write-Host "`nTEST 4: Rate Limiting (5 per minute)" -ForegroundColor Green
Write-Host "Sending 7 rapid requests with delays..." -ForegroundColor Gray

$body = @{
    name = "Rate Test"
    email = "phungtienthanh2004@gmail.com"
    message = "Testing rate limit"
    phone = ""
} | ConvertTo-Json

$successCount = 0
$blockedCount = 0

for ($i = 1; $i -le 7; $i++) {
    try {
        $response = Invoke-WebRequest -Uri $API_URL `
            -Method POST `
            -Headers @{
                "Origin" = "http://localhost:3000"
                "Content-Type" = "application/json"
            } `
            -Body $body `
            -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  Request $i`: OK" -ForegroundColor Green
            $successCount++
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 429) {
            Write-Host "  Request $i`: BLOCKED (429)" -ForegroundColor Red
            $blockedCount++
        } else {
            Write-Host "  Request $i`: ERROR $statusCode" -ForegroundColor Yellow
        }
    }
    Start-Sleep -Milliseconds 600
}

Write-Host "RESULT: $successCount passed, $blockedCount blocked" -ForegroundColor Cyan

# TEST 5: CORS Preflight
Write-Host "`nTEST 5: CORS Preflight (OPTIONS)" -ForegroundColor Green
Write-Host "Expected: 200 with CORS headers" -ForegroundColor Gray

$response = Invoke-WebRequest -Uri $API_URL `
    -Method OPTIONS `
    -Headers @{
        "Origin" = "http://localhost:3000"
    } `
    -ErrorAction SilentlyContinue

if ($response.StatusCode -eq 200) {
    Write-Host "PASS: Status 200 OK" -ForegroundColor Green
    Write-Host "CORS Headers:" -ForegroundColor Gray
    $response.Headers.Keys | Where-Object { $_ -like "*Access-Control*" } | ForEach-Object {
        Write-Host "  $_" -ForegroundColor Gray
    }
} else {
    Write-Host "FAIL: Status $($response.StatusCode)" -ForegroundColor Red
}

Write-Host "`n========== Tests Complete ==========" -ForegroundColor Cyan
