# Genetic-algorithm
  Program for determining the order in which the fuel capsules of the satellite's ion thrusters are activated to perform a predetermined series of maneuvers. 
The capsules are available in 5 varieties and are designed to provide speed gains of 2, 4, 6, 8 or 10 m/s. Each maneuver requires a speed boost of 1 to 12 m/s.</br> 
  To perform one maneuver, the satellite may simultaneously use two engines:
  - the first - allows you to get speed increase equal to value of used capsule. For example, for a capsule of 4 m/s, the gain will be exactly 4 m/s.
  - the second one - allows you to get a speed increase equal to half the value of the capsule. For example, for a capsule of 4 m/s, the gain will be exactly 2 m/s.
  Each engine can be started a maximum of once to complete one maneuver.</br>
  
Also, for one maneuver, the total speed increase is allowed less than the required one (for example, if the supply of capsules is not enough), 
but exceeding the specified speed increase is prohibited. Capsules cannot be reused. The algorithm determines such an order of using capsules,
in which the sum of speed increments for all maneuvers, and subject to all conditions, will be maximum, thus setting the most accurate trajectory. 
The number of maneuvers, the allowable increase in speed on each of them, as well as the available set of capsules can be arbitrary.
  This problem is solved using a genetic algorithm.
