
export const worldTemplate = {
    startingYear: 1607,
	initialPopulationCount: 10,

    minMarryAge: 9, // min marry age
    averageMarryAge: 19, // average marry age

    averageLifeSpanMale: 70,
    averageLifeSpanFemale: 80,

	// Birth Related stats
    infantMortalityRate: (81 / 10000) * 100, // SIDS rate 81 out of 100,000   
    birthParentMortalityRate: (1 / 2400) * 100,// Chance of mother dying in during child birth 1 in 2,400

	// Death states
	freakAccidentDeathRate: 1
}
