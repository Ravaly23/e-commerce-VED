export default function formatPrice(value: number) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "MGA"
    }).format(value);
};