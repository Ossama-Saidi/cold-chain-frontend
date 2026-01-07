export const formatDate = (isoString) => { 
  const date = new Date(isoString); 
  return date.toLocaleString('en-US', {  
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    timeZone: 'UTC', 
    timeZoneName: 'short' 
  }); 
}; 
 
export const getSeverityColor = (severity) => { 
  switch(severity) { 
    case 'high': return 'bg-red-100 text-red-800 border-red-300'; 
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'; 
    case 'low': return 'bg-blue-100 text-blue-800 border-blue-300'; 
    default: return 'bg-gray-100 text-gray-800 border-gray-300'; 
  } 
}; 
 
export const getStatusColor = (status) => { 
  switch(status) { 
    case 'open': return 'bg-red-500'; 
    case 'in_progress': return 'bg-yellow-500'; 
    case 'closed': return 'bg-green-500'; 
    default: return 'bg-gray-500'; 
  } 
}; 
 
export const exportCSV = (data, filename = "export.csv") => { 
  const csvContent = 
    "data:text/csv;charset=utf-8," + 
    [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n"); 
 
  const encodedUri = encodeURI(csvContent); 
  const link = document.createElement("a"); 
  link.setAttribute("href", encodedUri); 
  link.setAttribute("download", filename); 
  document.body.appendChild(link); 
  link.click(); 
  document.body.removeChild(link); 
};