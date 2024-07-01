export default function formatTimeAP(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
  
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const strTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return strTime;
  }
  