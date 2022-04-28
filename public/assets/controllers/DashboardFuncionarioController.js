class DashboardFuncionarioController {
  constructor() {}

  createPDF() {
    $.fn.createPdf = function (parametros) {
      var config = {
        fileName: "html-to-pdf",
      };

      if (parametros) {
        $.extend(config, parametros);
      }

      var quotes = document.getElementById($(this).attr("id"));

      html2canvas(quotes, {
        onrendered: function (canvas) {
          var pdf = new jsPDF("p", "pt", "letter");

          for (var i = 0; i <= quotes.clientHeight / 1140; i++) {
            var srcImg = canvas;
            var sX = 0;
            var sY = 1140 * i;
            var sWidth = 1660;
            var sHeight = 1140;
            var dX = -140;
            var dY = 0;
            var dWidth = 1300;
            var dHeight = 1140;

            window.onePageCanvas = document.createElement("canvas");
            onePageCanvas.setAttribute("width", 900);
            onePageCanvas.setAttribute("height", 1140);
            var ctx = onePageCanvas.getContext("2d");
            ctx.drawImage(
              srcImg,
              sX,
              sY,
              sWidth,
              sHeight,
              dX,
              dY,
              dWidth,
              dHeight
            );

            var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
            var width = onePageCanvas.width;
            var height = onePageCanvas.clientHeight;

            if (i > 0) {
              pdf.addPage(612, 791);
            }

            pdf.setPage(i + 1);
            pdf.addImage(
              canvasDataURL,
              "PNG",
              20,
              40,
              width * 0.62,
              height * 0.62
            );
          }

          pdf.save(config.fileName);
        },
      });
    };

    $("#renderPDF").createPdf({
      fileName: tituloPdf,
    });
  }
}
