import {
  SalesConversationInput,
  SalesConversationOutput,
  DetectedReplyIntent
} from "./types";

/**
 * AI AGENT 05: Sales Conversation Agent (Conversation)
 * 
 * Specialized Responsibility:
 * Analyzes inbound replies from prospects, accurately categorizes intent,
 * detects objections or meeting requests, flags unsubscribe requests,
 * and generates tailored context-aware responses with calendar links.
 */
export async function runSalesConversationAgent(
  input: SalesConversationInput
): Promise<SalesConversationOutput> {
  const text = input.inboundEmail.body.toLowerCase();
  const firstName = input.inboundEmail.senderName.split(" ")[0] || "there";
  const bookingUrl = input.calendarBookingUrl || "https://cal.com/salespilot/demo";

  // 1. Unsubscribe Detection
  if (
    text.includes("unsubscribe") ||
    text.includes("remove me") ||
    text.includes("stop emailing") ||
    text.includes("do not contact") ||
    text.includes("take me off")
  ) {
    return {
      messageId: input.inboundEmail.messageId,
      classifiedIntent: "UNSUBSCRIBE",
      confidenceScore: 0.99,
      sentiment: "NEGATIVE",
      isUnsubscribeRequest: true,
      recommendedAction: "UNSUBSCRIBE_AND_PURGE",
      suggestedResponse: `Understood, ${firstName}. You have been immediately removed from all future communications. Have a great quarter ahead!`,
      requiresHumanReview: false
    };
  }

  // 2. Direct Meeting Request
  if (
    text.includes("calendar") ||
    text.includes("book") ||
    text.includes("available") ||
    text.includes("schedule") ||
    text.includes("thursday") ||
    text.includes("zoom") ||
    text.includes("meet")
  ) {
    return {
      messageId: input.inboundEmail.messageId,
      classifiedIntent: "MEETING_REQUEST",
      confidenceScore: 0.97,
      sentiment: "POSITIVE",
      isUnsubscribeRequest: false,
      recommendedAction: "AUTO_REPLY_WITH_CALENDAR",
      suggestedResponse: `Hi ${firstName},\n\nFantastic, looking forward to speaking! You can select whatever time works best directly on my calendar here:\n\n${bookingUrl}\n\nTalk soon!`,
      requiresHumanReview: false
    };
  }

  // 3. Interested / Requesting More Info
  if (
    text.includes("pricing") ||
    text.includes("cost") ||
    text.includes("more info") ||
    text.includes("deck") ||
    text.includes("send over") ||
    text.includes("case study")
  ) {
    return {
      messageId: input.inboundEmail.messageId,
      classifiedIntent: "INTERESTED_MORE_INFO",
      confidenceScore: 0.93,
      sentiment: "POSITIVE",
      isUnsubscribeRequest: false,
      recommendedAction: "SEND_COLLATERAL",
      suggestedResponse: `Hi ${firstName},\n\nThanks for getting back to me! Our pricing is completely usage-based (~$0.03 per verified send) with zero monthly seat locks.\n\nI've attached our 1-page overview. Would you have 10 minutes next week to see a 2-minute live walkthrough? Here's my calendar: ${input.calendarBookingUrl}`,
      requiresHumanReview: false
    };
  }

  // 4. Competitor / Contract Objection
  if (text.includes("already using") || text.includes("contract") || text.includes("competitor") || text.includes("vendor")) {
    return {
      messageId: input.inboundEmail.messageId,
      classifiedIntent: "OBJECTION_COMPETITOR",
      confidenceScore: 0.89,
      sentiment: "NEUTRAL",
      isUnsubscribeRequest: false,
      recommendedAction: "PAUSE_SEQUENCE",
      suggestedResponse: `Completely understand, ${firstName}—respecting existing commitments is paramount. I will pause our communication and reach back out near your renewal cycle. Wishing you and the team continued success!`,
      requiresHumanReview: true
    };
  }

  // 5. Timing / Budget Objection
  if (text.includes("not right now") || text.includes("later") || text.includes("next quarter") || text.includes("budget")) {
    return {
      messageId: input.inboundEmail.messageId,
      classifiedIntent: "OBJECTION_TIMING",
      confidenceScore: 0.88,
      sentiment: "NEUTRAL",
      isUnsubscribeRequest: false,
      recommendedAction: "PAUSE_SEQUENCE",
      suggestedResponse: `Makes complete sense—timing is everything in growth initiatives. I'll make a note to follow up at the start of next quarter. Have a productive month!`,
      requiresHumanReview: false
    };
  }

  // 6. Out of Office
  if (text.includes("out of office") || text.includes("vacation") || text.includes("returning")) {
    return {
      messageId: input.inboundEmail.messageId,
      classifiedIntent: "OUT_OF_OFFICE",
      confidenceScore: 0.98,
      sentiment: "NEUTRAL",
      isUnsubscribeRequest: false,
      recommendedAction: "PAUSE_SEQUENCE",
      suggestedResponse: `[Auto-paused until return date]`,
      requiresHumanReview: false
    };
  }

  // 7. General Negative
  return {
    messageId: input.inboundEmail.messageId,
    classifiedIntent: "NOT_INTERESTED",
    confidenceScore: 0.91,
    sentiment: "NEGATIVE",
    isUnsubscribeRequest: false,
    recommendedAction: "PAUSE_SEQUENCE",
    suggestedResponse: `Thank you for letting me know, ${firstName}. I won't follow up further. Wishing you all the best!`,
    requiresHumanReview: false
  };
}
