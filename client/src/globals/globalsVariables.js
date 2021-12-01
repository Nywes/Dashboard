var background = "https://images6.alphacoders.com/352/352456.jpg";

var callBack = null;

function SetCallback(newCallback)
{
    callBack = newCallback;
}

function SetBackground(NewSrc)
{
    background = NewSrc;
    console.log("New background", background);

    if (callBack != null) {
        callBack(background);
    }
}

module.exports = {
    background,
    SetBackground,
    SetCallback
}
//export default { background, SetBackground }