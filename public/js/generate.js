function downloadPDFWithjsPDF() {
    console.log("Clicked");
    var element = document.getElementById('styledTable');
    var opt = {
        margin:       1,
        filename:     'generated_report.pdf',
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
    html2pdf().set(opt).from(element).save();
  }
  
  document.querySelector('#jsPDF').addEventListener('click', downloadPDFWithjsPDF);