import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxTable from './ContentBoxTable';

const TABLE_DATA = {
  guests: {
    batting: [
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0},
			{player_name:'SURNAME name',pos:'00',ab:0,h:0,'2b':0,'3b':0,hr:0,rbi:0,gdp:0,bb:0,hp:0,sh:0,sf:0,so:0,tb:0,avg:0,slg:0,obp:0,ops:0,sb:0,cs:0,'%sb':0,lob:0}
		],
		pitching: [
			{player_name:'SURNAME name (W/L)',PA:0,R:0,ER:0,h:0,'2B':0,'3B':0,HR:0,BB:0,IBB:0,HP:0,SH:0,SF:0,SO:0,WP:0,ERA:0,NP:0,NS:0,NB:0},
			{player_name:'SURNAME name',PA:0,R:0,ER:0,h:0,'2B':0,'3B':0,HR:0,BB:0,IBB:0,HP:0,SH:0,SF:0,SO:0,WP:0,ERA:0,NP:0,NS:0,NB:0},
			{player_name:'SURNAME name',PA:0,R:0,ER:0,h:0,'2B':0,'3B':0,HR:0,BB:0,IBB:0,HP:0,SH:0,SF:0,SO:0,WP:0,ERA:0,NP:0,NS:0,NB:0}
		],
		fielding: [
			{player_name:'SURNAME name (W/L)',CH:0,PO:0,A:0,E:0,DP:0,'FLD%':0},
			{player_name:'SURNAME name',CH:0,PO:0,A:0,E:0,DP:0,'FLD%':0},
			{player_name:'SURNAME name',CH:0,PO:0,A:0,E:0,DP:0,'FLD%':0}
		],
		catching: [
			{player_name:'SURNAME name (W/L)',SB:0,CS:0,PB:0},
			{player_name:'SURNAME name',SB:0,CS:0,PB:0},
			{player_name:'SURNAME name',SB:0,CS:0,PB:0}
		]
  }
};

const FOOTER_DATA = {
	leftData: {
		location: 'Moscow',
		stadium: 'RusStar Arena Ballpark',
		weather: 'Cloudy, +19',
		att: 300,
		t: '2:08',
		hpUmpire: 'Dzianis PRYPUTNEVICH'
		},
	rightData: {
		bUmpire: 'Milan Preradović',
		scorers: ['Nadezhda PASHKOVA', 'Petr ROTMISTROV', 'ALEXANDER KAVERIN'],
		tcs: ['Jürgen Elsishans', 'Alessandra Soprani']
	}
}

const ContentBox = () => {
	const {batting, pitching, fielding, catching} = TABLE_DATA.guests
	const {location, stadium, weather, att, t, hpUmpire} = FOOTER_DATA.leftData
	const {bUmpire, scorers, tcs} = FOOTER_DATA.rightData

  return (
	<div className={cl.box}>
		<div className="container">
			<div className={cl.tables}>
				<ContentBoxTable tableData={batting} tableClass={cl.battingTable} footerOffset={2} />
				<ContentBoxTable tableData={pitching} tableClass={cl.pitchingTable} footerOffset={1} />
				<div className={cl.wrapper}>
					<ContentBoxTable tableData={fielding} tableClass={cl.fieldingTable} footerOffset={1} />
					<ContentBoxTable tableData={catching} tableClass={cl.catchingTable} footerOffset={1} />
				</div>
			</div>
			<div className={cl.footerContainer}>
				<div className={cl.footer}>
				</div>
			</div>
		</div>
	</div>
)
};

export default ContentBox;
