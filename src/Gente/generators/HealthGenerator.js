
export default function HealthGenerator(personTemplate) {
	
	personTemplate.isAlive = true; 
	personTemplate.isSick = false;
	personTemplate.isPregnant = false;
	personTemplate.isFullTerm = false;

	personTemplate.afflications = [];

	return personTemplate;
}
