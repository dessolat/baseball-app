import React from 'react';
import cl from './ContentBox.module.scss';

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
			{player_name:'SURNAME name (W/L)',PA:0,R:0,ER:0,h:0,'2B':0,'3B':0,HR:0,BB:0,IBB:0,HP:0,SH:0,SF:0,SO:0,WP:0,ERA:0},
			{player_name:'SURNAME name',PA:0,R:0,ER:0,h:0,'2B':0,'3B':0,HR:0,BB:0,IBB:0,HP:0,SH:0,SF:0,SO:0,WP:0,ERA:0},
			{player_name:'SURNAME name',PA:0,R:0,ER:0,h:0,'2B':0,'3B':0,HR:0,BB:0,IBB:0,HP:0,SH:0,SF:0,SO:0,WP:0,ERA:0}
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

const ContentBox = () => {
	const {batting, pitching, fielding, catching} = TABLE_DATA.guests

  return (
	<div className={cl.box}>
		<div className="container">
			<div className={cl.tables}>
				<table className={cl.table + ' ' + cl.battingTable}>
					<thead>
						<tr>
							<th></th>
							<th></th>
							{Object.keys(batting[0]).slice(1).map((title, i) => <th key={i}>{title.toUpperCase()}</th>)}
							{/* {Object.keys(running[0]).slice(1).map((title, i) => <th key={i}>{title.toUpperCase()}</th>)} */}
						</tr>
					</thead>
					<tbody>
						{batting.map((player, i) => <tr key={i}>
							<td>{i+1}</td>
							{Object.values(player).map((value,j) => <td key={j}>{j >= 15 && j <= 18 ? value.toFixed(3) : value}</td>)}
							{/* {Object.values(running[i]).slice(1).map((value,j) => <td key={j}>{value}</td>)} */}
						</tr>)}
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td>TOTALS</td>
							<td></td>
							{Object.values(TABLE_DATA.guests.batting[0]).slice(2).map((value,j) => <td key={j}>{j >= 13 && j <= 16 ? value.toFixed(3) : value}</td>)}
							{/* {Object.values(TABLE_DATA.guests.running[0]).slice(1).map((value,j) => <td key={j}>{value}</td>)} */}
						</tr>
					</tfoot>
				</table>
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
