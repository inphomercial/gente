
export const personDefault = () => ({
	age: null,
	sex: null,
	dateOfBirth: null,
	dateOfDeath: null,

	isMarried: false,
	isSick: false,
	isPregnant: false,
	isFullTerm: false,

	afflictions: [],

	// Possible die roll for each person based on a range (ex: d4, d6, d20 -- combined fertility rates need to exceed global setting?)
	fertility: 0,

	parents: {
		fatherId: null,
		motherId: null
	},

	firstName: "",
	lastName: "",

	// Features
	eyeColor: null,

	spouseId: null,

	children: []
})