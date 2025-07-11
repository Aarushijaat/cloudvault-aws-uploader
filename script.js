async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function () {
    const base64Data = reader.result.split(',')[1]; // remove prefix

    try {
      const response = await fetch("https://m6hyw2z3k6.execute-api.ap-south-1.amazonaws.com/uploadtos3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body: base64Data
        })
      });

      const text = await response.text();
      document.getElementById("status").innerText = text.includes("success") 
        ? "✅ File uploaded to CloudVault!" 
        : "❌ Upload failed: " + text;
    } catch (err) {
      document.getElementById("status").innerText = "❌ Upload error: " + err.message;
      console.error("Error:", err);
    }
  };

  reader.readAsDataURL(file);
}
