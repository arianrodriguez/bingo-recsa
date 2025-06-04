const range_letters = {
    "B": [1, 15],
    "I": [16, 30],
    "N": [31, 45],
    "G": [46, 60],
    "O": [61, 75]
};

//[outer_color, inner_color]
const colors = [
    ["FFBD59", "FF9100"],
    ["FF6F61", "FF3D00"],
    ["6A0572", "A500B5"],
    ["00B09B", "96C93D"],
    ["FF4E50", "FC913A"],
    ["FDC830", "F37335"],
    ["FF758F", "FF7EB3"],
    ["00C9FF", "92FE9D"],
    ["FDC830", "F37335"],
    ["FF4E50", "FC913A"]
]

const numbers_registered = {}

const get_random_color = () => {
    const random_index = Math.floor(Math.random() * colors.length);
    return colors[random_index]
}

const animation_numbers_random = () => {
    const number = Math.floor(Math.random() * 75) + 1;
    return number
}

const generate_ball = () => {
    while(1) {
        let number = Math.floor(Math.random() * 75) + 1;

        if(Object.keys(numbers_registered).length === 75) return

        if(!numbers_registered[number]) {
            numbers_registered[number] = 1;
            return number;
        }
    }
}

const clear_numbers_registered = () => {
    Object.keys(numbers_registered).forEach(i => delete numbers_registered[i]);
}

export {
    generate_ball,
    animation_numbers_random,
    clear_numbers_registered,
    get_random_color,
    range_letters,
}