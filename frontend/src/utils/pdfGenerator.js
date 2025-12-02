import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId, fileName = 'document.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    try {
        // Wait for all images within the element to load
        const images = Array.from(element.querySelectorAll('img'));
        await Promise.all(images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = resolve; // Resolve even on error to continue
            });
        }));

        // Small delay to ensure rendering is stable
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(element, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // Handle images from other domains
            logging: false,
            backgroundColor: '#ffffff', // Ensure white background
            allowTaint: true,
            foreignObjectRendering: false // Sometimes helps with images
        });

        const imgData = canvas.toDataURL('image/png');

        // A4 dimensions in mm
        const pdfWidth = 210;
        const pdfHeight = 297;

        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        // First page
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add extra pages if content overflows
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(fileName);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};
