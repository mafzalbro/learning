export const charcode = () => {
    const codes = ["U+1F600", "U+DFFF"]

    console.log(
        codes.map(code => {
            const char = code.slice(2)
            const integar = parseInt(char, 16)
            const emoji = String.fromCodePoint(integar)
            return emoji
        })
    );
}