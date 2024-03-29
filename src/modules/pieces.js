import { clone } from "lodash";

const pieces = [
	{
		block: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
	},
	{
		block: [[2, 2, 0], [0, 2, 2], [0, 0, 0]]
	},
	{
		block: [[0, 3, 3], [3, 3, 0], [0, 0, 0]]
	},
	{
		block: [[4, 0, 0], [4, 4, 4], [0, 0, 0]]
	},
	{
		block: [[0, 0, 5], [5, 5, 5], [0, 0, 0]]
	},
	{
		block: [[0, 0, 0, 0], [0, 6, 6, 0], [0, 6, 6, 0], [0, 0, 0, 0]]
	},
	{
		block: [[0, 0, 0, 0], [7, 7, 7, 7], [0, 0, 0, 0], [0, 0, 0, 0]]
	}
];

export default index => clone(pieces[index]); //lodash function
