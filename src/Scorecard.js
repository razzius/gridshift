import React from 'react'

export default props => {
  //  if (state.gameOver) {
  //    return 'GAME OVER!'
  //  }

  /*
    props.gameState.fireDisaster = true;
    props.gameState.solar = true;
    props.gameState.batteries = true;
    props.gameState.cybertruck = true;
    props.gameState.fireBreak = true;
    */

  const hadPowerAtHome = props.gameState.solar && props.gameState.batteries
  const hadPowerInTown = props.gameState.microgrid
  const couldEvacuate =
    (props.gameState.escapeRoute &&
      props.gameState.cybertruck &&
      (hadPowerAtHome || hadPowerInTown)) ||
    (props.gameState.gasolinecar && hadPowerInTown) ||
    props.gameState.townEvacuationPlanForEveryone
  const homeBurntDown = !props.gameState.fireBreak
  const knewSchoolCouldSurvive = props.gameState.school

  return (
    <div className="scorecard">
      <div>
        <h1>Your family survived!</h1>
      </div>
      <div align="left">Your Home</div>
      <img
        src={homeBurntDown ? 'BurningHouse.jpg' : 'HomeIsSafe.png'}
        alt={`Home burnt down? ${homeBurntDown}`}
      ></img>
      <ul>
        <li>
          {props.gameState.solar
            ? props.gameState.battery
              ? 'Your home had power.  Your solar panels provided power, because you bought batteries as a backup energy storage device.'
              : "Your home has solar, but doesn't have batteries!  Solar needs batteries to work in a power outage.  It's great for the environment when you have power, but useless in a power outage unless you have energy storage."
            : "Your home didn't have any power."}
        </li>
        {props.gameState.disaster ? (
          props.gameState.fireBreak ? (
            <li>Your home was protected from the fire.</li>
          ) : props.gameState.campingGear ? (
            <li>
              Your home burnt down during the fire, but your camping gear
              provided a place to live
            </li>
          ) : knewSchoolCouldSurvive ? (
            <li>
              Your home burnt down, but you knew you could stay at the school as
              an emergency shelter.
            </li>
          ) : (
            <li>Your home burnt down and you have no place to stay.</li>
          )
        ) : (
          ''
        )}
        {props.gameState.fireDisaster && couldEvacuate ? (
          <li>Your family could leave town if the fire was out of control.</li>
        ) : props.gameState.fireDisaster ? (
          <li>
            Your family could not evacuate the town. The gas station requires
            power to pump gas, and electric cars require home generation or a
            microgrid.
          </li>
        ) : (
          ''
        )}
      </ul>

      <div align="left">Food</div>
      <ul>
        <li>
          {hadPowerAtHome
            ? 'Your refrigerated food was still good.'
            : props.gameState.hadNonPerishableFood
            ? 'Your family had canned goods and could eat.'
            : 'Your food spoiled.  Your family went to bed hungry every night.'}
        </li>
      </ul>

      <div align="left">Health Impacts</div>
      <ul>
        <li>
          {props.gameState.fireDisaster
            ? props.gameState.hadMask
              ? 'Your particulate mask helped keep you healthy from smoke exposure.'
              : 'Smoke from the fire irritated your lungs.  If only you had a mask!'
            : 'No medical problems came up.'}
        </li>
      </ul>

      <div align="left">Your community</div>
      <ul>
        <li>
          {hadPowerInTown
            ? 'Your town had power.'
            : 'Your town did not have power.'}
        </li>
      </ul>
    </div>
  )

  //<li>{props.gameState.neighborsRescued ? "Your neighbors were able to evacuate and are safe" : "Your neighbors might be stuck at home."}</li>
}
