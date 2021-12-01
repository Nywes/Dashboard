var background = "https://images6.alphacoders.com/352/352456.jpg";

function SetBackground(NewSrc)
{
    background = NewSrc;
    console.log("New background", background);
}

module.exports = {
    background,
    SetBackground
}
//export default { background, SetBackground }