export let icons = Object.fromEntries(Object.entries(import.meta.glob('../assets/icons/*.svg', { as: 'component', eager: true, import: 'default' })).map(([key, value]) => [key.match(/([^\.\\\/]+)\.svg/)[1], value]));
export default icons
