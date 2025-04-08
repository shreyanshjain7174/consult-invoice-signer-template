
declare module 'jspdf' {
  class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string);
    addImage(
      imageData: string, 
      format: string, 
      x: number, 
      y: number, 
      width: number, 
      height: number
    ): jsPDF;
    save(filename: string): jsPDF;
  }
  export default jsPDF;
}
