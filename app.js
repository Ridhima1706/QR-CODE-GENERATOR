function generateQR() {
  let number = document.getElementById("whatsappNumber").value.trim();
  if (!number.match(/^\d+$/)) {
    alert("Please enter a valid phone number.");
    return;
  }

  let message = encodeURIComponent("Hello! How are you?");
  let whatsappLink = `https://wa.me/${number}?text=${message}`;

  let canvas = document.getElementById("qrCanvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let qr = new QRCode(document.createElement("div"), {
    text: whatsappLink,
    width: 300,
    height: 300,
  });

  setTimeout(() => {
    let qrImage = qr._el.querySelector("img").src;
    let qrImg = new Image();
    qrImg.src = qrImage;

    let logo = new Image();
    logo.src =
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"; // WhatsApp logo
    logo.crossOrigin = "Anonymous";

    qrImg.onload = function () {
      ctx.drawImage(qrImg, 0, 0, 300, 300);

      logo.onload = function () {
        ctx.drawImage(logo, 115, 115, 70, 70);
        document.getElementById("qr-container").style.display = "block";
        document.getElementById("downloadPngBtn").style.display =
          "inline-block";
        document.getElementById("downloadPdfBtn").style.display =
          "inline-block";
      };
    };
  }, 500);
}

function downloadPNG() {
  let canvas = document.getElementById("qrCanvas");
  let pngUrl = canvas.toDataURL("image/png");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "whatsapp_qr.png";
  downloadLink.click();
}

function downloadPDF() {
  let { jsPDF } = window.jspdf;
  let pdf = new jsPDF();
  let canvas = document.getElementById("qrCanvas");
  let pngUrl = canvas.toDataURL("image/png");

  pdf.addImage(pngUrl, "PNG", 50, 30, 100, 100);
  pdf.save("whatsapp_qr.pdf");
}
