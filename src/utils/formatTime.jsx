export const formatTime = (seconds) => {
  console.log("Received seconds:", seconds);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = (seconds % 60).toFixed(2);
    
    return `${hrs}h ${mins}m ${secs}s`;
  };
  