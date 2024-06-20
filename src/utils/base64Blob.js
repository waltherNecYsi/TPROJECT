// Función para convertir datos base64 en un objeto Blob
export default function base64toBlob(base64Data) {
   const byteString = window.atob(base64Data);
   const arrayBuffer = new ArrayBuffer(byteString.length);
   const int8Array = new Uint8Array(arrayBuffer);
   for (let i = 0; i < byteString.length; i += 1) {
     int8Array[i] = byteString.charCodeAt(i);
   }
   const blob = new Blob([int8Array], { type: 'application/pdf' });
   return blob;
 }
