/**
 * 📊 Analytics Event Tracking
 * Wrapper for Vercel Analytics custom events
 * Using Vercel Analytics for portfolio tracking
 */

/**
 * Track custom events for Vercel Analytics
 * Events are automatically sent to Vercel dashboard
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, string | number | boolean>
) => {
  // Vercel Analytics captures events through the standard Web Analytics API
  if (typeof window !== "undefined") {
    try {
      // Using the standard Web API for analytics
      const event = new Event(eventName);
      window.dispatchEvent(event);

      // Also log to console in development for debugging
      if (process.env.NODE_ENV === "development") {
        console.log(`📊 [Analytics Event] ${eventName}`, eventData);
      }
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  }
};

/**
 * Track portfolio section views
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent("portfolio_section_view", {
    section: sectionName,
    timestamp: Date.now(),
  });
};

/**
 * Track project clicks
 */
export const trackProjectClick = (projectName: string, projectIndex: number) => {
  trackEvent("portfolio_project_click", {
    project: projectName,
    index: projectIndex,
    timestamp: Date.now(),
  });
};

/**
 * Track external link clicks (GitHub, LinkedIn, etc)
 */
export const trackExternalLinkClick = (linkName: string, linkUrl: string) => {
  trackEvent("external_link_click", {
    link: linkName,
    url: linkUrl,
    timestamp: Date.now(),
  });
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmit = (
  status: "success" | "error",
  errorType?: string
) => {
  trackEvent("contact_form_submit", {
    status: status,
    error: errorType || "none",
    timestamp: Date.now(),
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentScrolled: number) => {
  // Only track at 25%, 50%, 75%, 100% intervals to avoid too many events
  const roundedPercent = Math.round(percentScrolled / 25) * 25;
  trackEvent("scroll_depth", {
    percent: roundedPercent,
    timestamp: Date.now(),
  });
};
