'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { barColors } from 'stiff-gpt/constants/colors';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ActiveElement,
	ChartEvent,
} from 'chart.js';
import { Usage } from 'stiff-gpt/app/[locale]/dashboard/usage/page';

interface Props {
	data: Usage[];
}

interface SeparatedUsage {
	[integrationId: number]: Usage[];
}

const UsageBarChart: React.FC<Props> = ({ data }) => {
	const [selectedUsage, setSelectedUsage] = useState<Usage | null>(null);
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: false,
				text: 'Chart.js Bar Chart',
			},
		},
		onClick: (event: ChartEvent, elements: ActiveElement[]) => {
			console.log('clicked', elements);
			if (elements[0] === undefined || data[elements[0].index] === undefined) {
				return;
			}
			setSelectedUsage(data[elements[0].index]);
		},
	};

	const onBarClick = () => console.log('bar clicked');

	const separatedData: SeparatedUsage = data.reduce((result, usage) => {
		const { integrationId } = usage;
		if (integrationId !== null) {
			if (!result.hasOwnProperty(integrationId)) {
				result[integrationId] = [];
			}
			result[integrationId].push(usage);
		}
		return result;
	}, {} as SeparatedUsage);

	const datasets = Object.entries(separatedData).map(
		([integrationId, usageList]) => {
			const colorIndex = Math.floor(Math.random() * barColors.length);
			const backgroundColor = barColors[colorIndex];
			return {
				label: integrationId,
				data: usageList.map((item: Usage) => item.tokenCount / 1000),
				backgroundColor,
			};
		}
	);
	const chartData = {
		labels: data.map((item, index) => (index % 2 == 1 ? item.recordDate : '')),
		datasets: datasets,
	};

	return (
		<div className="pt-8">
			<Bar data={chartData} options={options} />
			{selectedUsage === null ? null : (
				<div className="flex flex-col">
					<div>Selected Usage: {selectedUsage.recordDate}</div>
					<div>Integration ID: {selectedUsage.integrationId?.toString()}</div>
					<div>
						Integration TYPE: {selectedUsage.Integration?.type?.toString()}
					</div>
				</div>
			)}
		</div>
	);
};

export default UsageBarChart;
