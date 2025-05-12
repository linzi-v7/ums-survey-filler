function fill(value) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (rating) => {
        const radios = document.querySelectorAll(
          `input[type="radio"][value="${rating}"]`
        );
        radios.forEach((r) => {
          r.checked = true;

          // Dispatch synthetic events to simulate user interaction
          r.dispatchEvent(new Event("click", { bubbles: true }));
          r.dispatchEvent(new Event("change", { bubbles: true }));
        });

        console.log(
          `[UMS Survey Filler] Simulated user selection on ${radios.length} radio buttons with value ${rating}`
        );

        // Scroll to Submit Button
        const submitButton = document.querySelector(
          "button.btn_three.default-big-btn"
        );

        if (submitButton) {
          submitButton.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          console.log("[UMS Survey Filler] Scrolled to submit button.");
        } else {
          console.warn("[UMS Survey Filler] Submit button not found.");
        }
      },
      args: [value],
    });
  });
}

// Add listeners to all buttons
document.querySelectorAll("button[data-value]").forEach((button) => {
  button.addEventListener("click", () => {
    const value = parseInt(button.getAttribute("data-value"));
    fill(value);
  });
});
