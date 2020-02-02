export default function(type) {
    if (!type.instance) {
        type.instance = new type();
    }
    return type.instance;
}