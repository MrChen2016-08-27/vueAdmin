import G2 from '@antv/g2'
import DataSet from '@antv/data-set';

export default {
    createCircelChart(id, list, width=380, height=300, options={}, offset=10) {
        const dv = new DataSet.DataView();
        dv.source(list).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        var chart = new G2.Chart({
            container: id,
            width,
            // forceFit: true,
            height,
            ...options
        });
        chart.source(dv, {
            percent: {
                formatter: function formatter(val) {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                }
            }
        });
        chart.coord('theta');
        chart.tooltip({
            showTitle: false,
            itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        });
        chart.intervalStack().position('percent').color('item').label('percent', {
            // autoRotate: false,
            offset: offset,
            textStyle: {
                rotate: 0,
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)'
            },
            formatter: (text, item) => {
                return `${item.point.count}(${text})`;
            }
        }).tooltip('item*percent', function(item, percent) {
            percent = (percent * 100).toFixed(2) + '%';
            return {
                name: item,
                value: percent
            };
        }).style({
            lineWidth: 1,
            stroke: '#fff'
        });
        chart.render();
        return chart;
    },
    changeChartData(chartName, list) {
        const dv = new DataSet.DataView();
            dv.source(list).transform({
                type: 'percent',
                field: 'count',
                dimension: 'item',
                as: 'percent'
            });
        this[chartName].changeData(dv);
    },
    createBasicColumnChart(id, list) {
          var chart = new G2.Chart({
            container: id,
            // forceFit: true,
            width: 650,
            height: 500
          });
          chart.source(list);
          chart.scale('sales', {
            tickInterval: 10
          });
          chart.interval().position('year*sales');
          chart.render();
    },
    createFoldChart(id, fields, list) {
        const ds = new DataSet();
        var dv = ds.createView().source(list);
        dv.transform({
            type: 'fold',
            fields, // 展开字段集
            key: '类型', // key字段
            value: '数量' // value字段
        });

        var chart = new G2.Chart({
            container: id,
            forceFit: true,
            height: 350
        });
        chart.source(dv);
        chart.interval().position('类型*数量').color('name')
        .label('数量', { offset: 5 }).size(50)
        .adjust([{
            type: 'dodge',
            marginRatio: 1 / 32
        }]);
        chart.render();
        return chart;
    },
    changeFoldChartData(chartName, fields, list) {
        const dv = new DataSet.DataView();
        dv.source(list).transform({
            type: 'fold',
            fields: fields, // 展开字段集
            key: '类型', // key字段
            value: '数量' // value字段
        });
        this[chartName].changeData(dv);
    },
}