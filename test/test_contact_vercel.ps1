# Test Contact Form API on Vercel - Simple Version
# Usage: ./test/test_contact_vercel.ps1

$domain = "https://phungtienthanh.vercel.app"
$apiUrl = "$domain/api/contact"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Testing Contact Form API" -ForegroundColor Cyan
Write-Host "Domain: $domain" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Send contact form
Write-Host "Sending test email..." -ForegroundColor Yellow

$body = @{
    name = "Thành Tiến Phùng"
    email = "phungtienthanh2004@gmail.com"
    subject = "Test Email from Vercel"
    message = "This is a test message to verify email delivery from Vercel deployment"
    phone = ""
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $apiUrl `
        -Method POST `
        -Headers @{
            "Content-Type" = "application/json"
        } `
        -Body $body `
        -ErrorAction Stop

    Write-Host "✅ SUCCESS! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Message: Email sent successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Check Resend console: https://resend.com/emails" -ForegroundColor Cyan
} catch {
    Write-Host "❌ FAILED! Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

Write-Host "================================" -ForegroundColor Cyan
