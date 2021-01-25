import styled from 'styled-components';
import Color from '../Assets/Color';

export const Section = styled.section`
	margin-bottom: 10px;
	h2{
		margin-top: 0;
		padding: 5px 0;
		padding-left: 30px;
		border-left: solid 5px ${Color.blue};
		border-bottom: solid 1px #bababa;
		font-size: 17px;
	}
	
	&.margin-none{
		margin: 0;
	}

	>*:not(h2):not(span):not(.cards):not(.card):not(.margin-left-none){
		margin-left: 30px;
	}
	
	h3{
		text-align:center;
	}
	.blue{
		color: ${Color.blue};
	}
	.red{
		color: ${Color.red};
	}
	.green{
		color: ${Color.green};
	}
`
