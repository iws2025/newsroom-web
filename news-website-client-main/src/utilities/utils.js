export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

export const cleanObj = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
    );
}