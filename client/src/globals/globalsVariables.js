var background = "https://img.wallpapic.fr/i1862-037-811/medium/espace-violet-bleus-astronomie-fond-d-ecran.jpg";

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