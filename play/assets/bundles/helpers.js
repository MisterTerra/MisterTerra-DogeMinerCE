import { Utils } from "../../js/utils";

import miningShibeIdle from '../helpers/shibes/shibes-idle-0.png';
import miningShibeMine from '../helpers/shibes/shibes-mine-0.png';

import dogeKennelsIdle from '../helpers/kennels/kennels-idle-0.png';
import dogeKennelsMine from '../helpers/kennels/kennels-mine-0.png';

import streamerKittensIdle from '../helpers/kittens/kittens-idle-0.png';
import streamerKittensMine from '../helpers/kittens/kittens-mine-0.png';

import spaceRocketIdle from '../helpers/rockets/rockets-idle-0.png';
import spaceRocketMine from '../helpers/rockets/rockets-mine-0.png';

import timeMachineRigIdle from '../helpers/rigs/rigs-idle-0.png';
import timeMachineRigMine from '../helpers/rigs/rigs-mine-0.png';

import infiniteDogebilityIdle from '../helpers/dogebility/dogebility-idle-0.png';
import infiniteDogebilityMine from '../helpers/dogebility/dogebility-mine-0.png';

import moonBaseIdle from '../helpers/bases/bases-idle-0.png';
import moonBaseMine from '../helpers/bases/bases-mine-0.png';

import moonShibeIdle from '../helpers/moonshibe/moonshibe-idle-0.png';
import moonShibeMine from '../helpers/moonshibe/moonshibe-mine-0.png';

import dogeCarIdle from '../helpers/dogecar/dogecar-idle-0.png';
import dogeCarMine from '../helpers/dogecar/dogecar-mine-0.png';

import landerShibeIdle from '../helpers/landershibe/landershibe-idle-0.png';
import landerShibeMine from '../helpers/landershibe/landershibe-mine-0.png';

import marsRocketIdle from '../helpers/marsrocket/marsrocket-idle-0.png';
import marsRocketMine from '../helpers/marsrocket/marsrocket-mine-0.png';

import dogeGateIdle from '../helpers/dogegate/dogegate-idle-0.png';
import dogeGateMine from '../helpers/dogegate/dogegate-mine-0.png';

import marsBaseIdle from '../helpers/marsbase/marsbase-idle-0.png';
import marsBaseMine from '../helpers/marsbase/marsbase-mine-0.png';

import partyShibeIdle from '../helpers/partyshibe/partyshibe-idle-0.png';
import partyShibeMine from '../helpers/partyshibe/partyshibe-mine-0.png';

import curiosiDogeIdle from '../helpers/curiosidoge/curiosidoge-idle-0.png';
import curiosiDogeMine from '../helpers/curiosidoge/curiosidoge-mine-0.png';

import djKittenzIdle from '../helpers/djkittenz/djkittenz-idle-0.png';
import djKittenzMine from '../helpers/djkittenz/djkittenz-mine-0.png';

import spaceBassIdle from '../helpers/spacebass/spacebass-idle-0.png';
import spaceBassMine from '../helpers/spacebass/spacebass-mine-0.png';

import jupiterRocketIdle from '../helpers/juprocket/juprocket-idle-0.png';
import jupiterRocketMine from '../helpers/juprocket/juprocket-mine-0.png';

import cloudBaseIdle from '../helpers/jupiterbase/jupiterbase-idle-0.png';
import cloudBaseMine from '../helpers/jupiterbase/jupiterbase-mine-0.png';

import superShibeIdle from '../helpers/supershibe/supershibe-idle-0.png';
import superShibeMine from '../helpers/supershibe/supershibe-mine-0.png';

import dogeAirShipIdle from '../helpers/airship/airship-idle-0.png';
import dogeAirShipMine from '../helpers/airship/airship-mine-0.png';

import flyingDoggoIdle from '../helpers/flyingdoge/flyingdoge-idle-0.png';
import flyingDoggoMine from '../helpers/flyingdoge/flyingdoge-mine-0.png';

import tardogeisIdle from '../helpers/tardogeis/tardogeis-idle-0.png';
import tardogeisMine from '../helpers/tardogeis/tardogeis-mine-0.png';

import dogeStarIdle from '../helpers/dogestar/dogestar-idle-0.png';
import dogeStarMine from '../helpers/dogestar/dogestar-mine-0.png';

import titanBaseIdle from '../helpers/titanbase/titanbase-idle-0.png';
import titanBaseMine from '../helpers/titanbase/titanbase-mine-0.png';

import roboShibeIdle from '../helpers/roboshibe/roboshibe-idle-0.png';
import roboShibeMine from '../helpers/roboshibe/roboshibe-mine-0.png';

import heavyDogeWalkerIdle from '../helpers/walker/walker-idle-0.png';
import heavyDogeWalkerMine from '../helpers/walker/walker-mine-0.png';

import coinSeeker5000Idle from '../helpers/seeker/seeker-idle-0.png';
import coinSeeker5000Mine from '../helpers/seeker/seeker-mine-0.png';

import timeTravelDRexIdle from '../helpers/trex/trex-idle-0.png';
import timeTravelDRexMine from '../helpers/trex/trex-mine-0.png';

import altarOfTheSunDogeIdle from '../helpers/altarofthesundoge/altarofthesundoge-idle-0.png';
import altarOfTheSunDogeMine from '../helpers/altarofthesundoge/altarofthesundoge-mine-0.png';

/* TODO - should we group by planet?
** Yes, yes we should. This would allow us to very easily preload assets by simply pointing towards the group we want to preload
*/

export const helperSprites = Utils.deepFreeze({
    miningShibe: {idle: miningShibeIdle, mine: miningShibeMine},
    dogeKennels: {idle: dogeKennelsIdle, mine: dogeKennelsMine},
    streamerKittens: {idle: streamerKittensIdle, mine: streamerKittensMine},
    spaceRocket: {idle: spaceRocketIdle, mine: spaceRocketMine},
    timeMachineRig: {idle: timeMachineRigIdle, mine: timeMachineRigMine},
    infiniteDogebility: {idle: infiniteDogebilityIdle, mine: infiniteDogebilityMine},

    moonBase: {idle: moonBaseIdle, mine: moonBaseMine},
    moonShibe: {idle: moonShibeIdle, mine: moonShibeMine},
    dogeCar: {idle: dogeCarIdle, mine: dogeCarMine},
    landerShibe: {idle: landerShibeIdle, mine: landerShibeMine},
    marsRocket: {idle: marsRocketIdle, mine: marsRocketMine},
    dogeGate: {idle: dogeGateIdle, mine: dogeGateMine},

    marsBase: {idle: marsBaseIdle, mine: marsBaseMine},
    partyShibe: {idle: partyShibeIdle, mine: partyShibeMine},
    curiosiDoge: {idle: curiosiDogeIdle, mine: curiosiDogeMine},
    djKittenz: {idle: djKittenzIdle, mine: djKittenzMine},
    spaceBass: {idle: spaceBassIdle, mine: spaceBassMine},
    jupiterRocket: {idle: jupiterRocketIdle, mine: jupiterRocketMine},

    cloudBase: {idle: cloudBaseIdle, mine: cloudBaseMine},
    superShibe: {idle: superShibeIdle, mine: superShibeMine},
    dogeAirShip: {idle: dogeAirShipIdle, mine: dogeAirShipMine},
    flyingDoggo: {idle: flyingDoggoIdle, mine: flyingDoggoMine},
    tardogeis: {idle: tardogeisIdle, mine: tardogeisMine},
    dogeStar: {idle: dogeStarIdle, mine: dogeStarMine},

    titanBase: {idle: titanBaseIdle, mine: titanBaseMine},
    roboShibe: {idle: roboShibeIdle, mine: roboShibeMine},
    heavyDogeWalker: {idle: heavyDogeWalkerIdle, mine: heavyDogeWalkerMine},
    coinSeeker5000: {idle: coinSeeker5000Idle, mine: coinSeeker5000Mine},
    timeTravelDRex: {idle: timeTravelDRexIdle, mine: timeTravelDRexMine},
    altarOfTheSunDoge: {idle: altarOfTheSunDogeIdle, mine: altarOfTheSunDogeMine}
});