export let icons = Object.fromEntries(Object.entries(import.meta.glob('../assets/icons/*.svg', { as: 'component', eager: true, import: 'default' })).map(([key, value]) => {
    let component = value
    return [key.match(/([^\.\\\/]+)\.svg/)[1], component]
}));
export default icons
