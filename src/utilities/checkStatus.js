const checkStatus = (status) => {
    
    if(status === 1) return "Start";
    else if(status === 2) return "In Progress";
    else if(status === 3) return "Completed";
}

export default checkStatus;