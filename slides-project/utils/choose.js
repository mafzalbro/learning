// Function choose two things on 50/50 probability (if order is 1, use overlay, if 2, use overlay2 and vice versa)
function choose(overlay, overlay2, order) {
    return Math.random() < 0.5 ? (order === 1 ? overlay : overlay2) : (order === 1 ? overlay2 : overlay);
}


module.exports = choose