const teamMembers = [
	{
	name: 'Phiona Tumbaga',
	role: 'Web Developer',
	bio: 'Senior at CSULB. Majoring in Computer Science with a Minor in CyberSecurity. From the LA Area',
	imageUrl: 'https://scarletviolet.pokemon.com/_images/pokemon/pawmi/pokemon-pawmi.png',
	email: 'PhionaNicole.Tumbaga@student.csulb.edu',
	},
	{
	name: 'Ellesia Truong',
	role: 'Web Developer',
	bio: 'Senior at CSULB. Majoring in Computer Science with a Minor in CyberSecurity. From the LA Area',
	imageUrl: 'https://static.pokemonpets.com/images/monsters-images-800-800/94-Gengar.webp',
	email: 'ellesia.truong@student.csulb.edu',
	},
	{
	name: 'Luke Reissmueller',
	role: 'Web Developer',
	bio: 'Senior at CSULB. Majoring in Computer Science. From the LA Area',
	imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
	email: 'luke.reissmueller@student.csulb.edu',
	},
	{
	name: 'Jake Spievak',
	role: 'Web Developer',
	bio: 'Senior at CSULB. Majoring in Computer Science. From the LA Area',
	imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
	email: 'jakespievak@student.CSULB.edu',
	},
	{
	name: 'Mark Fastner',
	role: 'Web Developer',
	bio: 'Senior at CSULB. Majoring in Computer Science. From the LA Area',
	imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009_f2.png',
	email: 'mark.fastner@student.csulb.edu',
	},
];

function About() {
	return (
	<div className=" bg-blue-200 dark:bg-slate-600 mx-auto py-2 p-10 min-h-screen">
		<div className="text-center py-2 my-2 items-center text-bold flex justify-center">
			<h1 className="flex justify-center text-3xl font-bold">About the Runtime Team</h1>
		</div>

		<div className="flex justify-center">
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{teamMembers.map((member, index) => (
			<div key={index} className="border p-4 bg-blue-100 dark:bg-slate-700 dark:border-black rounded-lg">
				<img className="mx-auto mb-4 " src={member.imageUrl} alt={member.name} style={{width: '150px', height: '150px'}}/>
				
				<h3 className="text-xl font-bold">
                <a href={`mailto:${member.email}`} className="flex justify-center text-xl font-bold text-sky-900 dark:text-blue-100">{member.name}</a>
            </h3>
				<p className="flex justify-center text-blue-200 ">{member.role}</p>
				<p className="flex justify-center mt-4 dark:text-white">{member.bio}</p>
			</div>
			))}
		</div>
		</div>
	</div>
	);
}

export default About;
