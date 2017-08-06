
export const worldTemplate = {
	startingYear: 1607,
	initialPopulationCount: 20,

	minMarryAge: 9, // min marry age
	averageMarryAge: 19, // average marry age

	minPregnantAge: 10,

	averageLifeSpanMale: 70,
	averageLifeSpanFemale: 80,

	// Birth Related stats
	infantMortalityRate: (81 / 10000) * 100, // SIDS rate 81 out of 100,000   
	birthParentMortalityRate: (1 / 2400) * 100, // Chance of mother dying in during child birth 1 in 2,400

	// Death causes
	freakAccidentDeathRate: (57 / 100000) * 100, // 57 out of 100,000
	lungCancerDeathRate: (20 / 100000) * 100, // 20 out of 100,000
	liverCancerDeathRate: (1.08 / 100000) * 100, // 1.08 out of 100,000
	heartDiseaseDeathRate: (268 / 100000) * 100, // 286 out of 100,000

  // 0 - N, the larger this number, the more people they "sample" per turn
  numPeopleMetPerTurn: 10,

  // 0 - 100, the smaller the number the more likely to find a mate
  minMinglingPercentage: 70,

  // 0 - N, number of people that are evaluated per turn. the larger, the slower
  turnSampleSize: 500
}
