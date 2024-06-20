export const getSubdomain = () => {
    const domain = window.location.hostname
    const subdomain = domain.split('.');
    return subdomain[0];
}