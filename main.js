const MAIN_SLIDE_SVG_MARGIN = 60;
const MIN_SLIDE_NUMBER = 1;
const MAX_SLIDE_NUMBER = 6;
const SLIDE_NUMBER_TO_YEAR_RANGE = {
  1: [2001, 2001],
  2: [2002, 2007],
  3: [2008, 2011],
  4: [2012, 2016],
  5: [2017, 2019],
  6: [2020, 2020]
};

const MAIN_SLIDE_YEARS = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
  2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

const MAIN_SLIDE_SVG_Y_AXIS_MIN = 0;
const MAIN_SLIDE_SVG_Y_AXIS_MAX = 900;

const AXIS_MARGIN = 60;
const TILE_MARGIN = 2;
const SVG_HEIGHT = 660;
const SVG_WIDTH = 660;
const LEGEND_WIDTH = (SVG_WIDTH - 2 * AXIS_MARGIN);
const LEGEND_TILE_HEIGHT = 35;
const MIN_DAY = 1;
const MIN_MONTH = 1;
const MIN_YEAR = 2001;
const MIN_WEEK_NUMBER = 1;
const DAYS_IN_WEEK = 7;
const MONTH_MAPPING = ["null", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // 1 indexed
const DAY_MAPPING = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // 0 indexed


var main_slide_svg = null;
var drill_down_year_svg = null;
var drill_down_month_svg = null;
var slide_number = 1;

function map_months(months) {
  return months.map(i => MONTH_MAPPING[i]);
}

function map_days(days) {
  return days.map(i => DAY_MAPPING[i]);
}

function get_active_slide_title() {
  let title = "";
  if (slide_number == 1) {
    title = "Year 2001";
  }
  else if (slide_number == 2) {
    title = "Years 2002 to 2007";
  }
  else if (slide_number == 3) {
    title = "Years 2008 to 2011";
  }
  else if (slide_number == 4) {
    title = "Years 2012 to 2016";
  }
  else if (slide_number == 5) {
    title = "Years 2017 to 2019";
  }
  else if (slide_number == 6) {
    title = "Year 2020";
  }
  return title;
}

function get_active_slide_text_1() {
  let text = "";
  if (slide_number == 1) {
    text = "In 2001, 667 homicides were reported in Chicago. In other words, nearly 1.83 homicides were being reported on average every day.";
  }
  else if (slide_number == 2) {
    text = "In the six years between 2002 and 2007, there was a noticeable decline in the number of homicides reported per year in Chicago.";
  }
  else if (slide_number == 3) {
    text = "In 2008, there was a slight resurgence in the number of homicides reported in Chicago.";
  }
  else if (slide_number == 4) {
    text = "But the equilibrium depicted in previous years would not last for long.";
  }
  else if (slide_number == 5) {
    text = "From 2017 to 2019, there was a sharp decline in the number of homicides reported per year.";
  }
  else if (slide_number == 6) {
    text = "Unfortunately, a 21st-century record high of 789 homicides was reported in Chicago in 2020.";
  }
  return text
}

function get_active_slide_text_2() {
  let text = "";
  if (slide_number == 1) {
    text = "According to the Chicago Tribune, a news company, Chicago had the most homicides reported out of any city in the United States in 2001. New York City followed closely with 642 homicides reported.";
  }
  else if (slide_number == 2) {
    text = "Most remarkably, 150 less homicides were reported in 2004 than in 2003.";
  }
  else if (slide_number == 3) {
      text = "However, from 2009 to 2011, the number of homicides reported per year did not increase. Moreover, homicide statistics from 2004 to 2011 seem to oscillate around an equilibrium of approximately 450 homicides reported per year.";
  }
  else if (slide_number == 4) {
    text = "While the number of homicides reported from 2012 to 2015 were on par with past years, a groundbreaking 788 homicides were reported in 2016. This number was, at the time, a record high for Chicago in the 21st century.";
  }
  else if (slide_number == 5) {
    text = "In fact, every year in this interval saw a decrease of at least 75 homicides reported compared to the year before. In 2019, 505 homicides were reported -- a somewhat hopeful statistic in light of the 788 homicides reported in 2016.";
  }
  else if (slide_number == 6) {
    text = "With soaring racial tensions, growing concern over police brutality, and the unprecedented COVID-19 pandemic, violence surged across the United States.";
  }
  return text;
}

function get_active_slide_text_3() {
  let text = "";
  if (slide_number == 1) {
    text = "Consequently, in the second year of the 21st century, Chicago was arguably the bloodiest city in the entire nation.";
  }
  else if (slide_number == 2) {
    text = "";
  }
  else if (slide_number == 3) {
    text = "";
  }
  else if (slide_number == 4) {
    text = "According to The Guardian, a news company, increased racial tensions and gun violence -- in conjunction with a flawed criminal justice system -- contributed to the rise in homicides.";
  }
  else if (slide_number == 5) {
    text = "Indeed, Chicago's efforts to curb gun violence appeared to be working.";
  }
  else if (slide_number == 6) {
    text = "Chicago was no exception. There were 19 homicides reported in just one day -- May 31, 2020. It seemed that with the events of 2016 occurring just a few years prior, history was repeating itself.";
  }
  return text;
}

function setup_legend_data(max_daily_homicides) {
  let legend_data = [];
  for (let i = 0; i <= max_daily_homicides; i += 1) {
    legend_data.push(i);
  }
  return legend_data;
}

function set_active_slide() {
  for (let i = MIN_SLIDE_NUMBER; i <= MAX_SLIDE_NUMBER; i += 1) {
    $('#slidebtn' + String(i)).removeClass("activeSlide");
  }

  $('#slidebtn' + String(slide_number)).addClass("activeSlide");
}

function append_main_svg_annotations() {
  if (slide_number == 1) {
    main_slide_svg.append("g").attr("transform", `translate(90, 150)`)
      .append("text")
      .text("667");
  }
  if (slide_number == 2) {
    main_slide_svg.append("g").attr("transform", `translate(120, 160)`)
      .append("text")
      .text("657");
    main_slide_svg.append("g").attr("transform", `translate(150, 190)`)
      .append("text")
      .text("604");
    main_slide_svg.append("g").attr("transform", `translate(110, 310)`)
      .append("text")
      .text("454");
    main_slide_svg.append("g").attr("transform", `translate(190, 330)`)
      .append("text")
      .text("453");
    main_slide_svg.append("g").attr("transform", `translate(230, 270)`)
      .append("text")
      .text("477");
    main_slide_svg.append("g").attr("transform", `translate(270, 310)`)
      .append("text")
      .text("448");
  }
  if (slide_number == 3) {
    main_slide_svg.append("g").attr("transform", `translate(300, 250)`)
      .append("text")
      .text("513");
    main_slide_svg.append("g").attr("transform", `translate(320, 280)`)
      .append("text")
      .text("461");
    main_slide_svg.append("g").attr("transform", `translate(330, 340)`)
      .append("text")
      .text("438");
    main_slide_svg.append("g").attr("transform", `translate(390, 315)`)
      .append("text")
      .text("438");
  }
  if (slide_number == 4) {
    main_slide_svg.append("g").attr("transform", `translate(420, 250)`)
      .append("text")
      .text("515");
    main_slide_svg.append("g").attr("transform", `translate(385, 330)`)
      .append("text")
      .text("429");
    main_slide_svg.append("g").attr("transform", `translate(476, 333)`)
      .append("text")
      .text("426");
    main_slide_svg.append("g").attr("transform", `translate(510, 273)`)
      .append("text")
      .text("502");
    main_slide_svg.append("g").attr("transform", `translate(534, 64)`)
      .append("text")
      .text("788");
  }
  if (slide_number == 5) {
    main_slide_svg.append("g").attr("transform", `translate(570, 145)`)
      .append("text")
      .text("675");
    main_slide_svg.append("g").attr("transform", `translate(600, 185)`)
      .append("text")
      .text("600");
    main_slide_svg.append("g").attr("transform", `translate(623, 245)`)
      .append("text")
      .text("505");
  }
  if (slide_number == 6) {
    main_slide_svg.append("g").attr("transform", `translate(620, 55)`)
      .append("text")
      .text("789");
  }
}

async function increment_slide_number() {
  if (slide_number < MAX_SLIDE_NUMBER) {
    slide_number += 1;
    await render_slide_number();
    set_active_slide();
  }
}

async function set_slide_number(num) {
  if (num >= MIN_SLIDE_NUMBER && num <= MAX_SLIDE_NUMBER) {
    slide_number = num;
    await render_slide_number();
    set_active_slide();
  }
}

async function render_slide_number() {
  let first_year = SLIDE_NUMBER_TO_YEAR_RANGE[slide_number][0]
  let last_year = SLIDE_NUMBER_TO_YEAR_RANGE[slide_number][1]
  let data = await d3.csv("./data/chicago_yearly_homicide_data.csv")

  data = data.map(elem => {
      return {
        year: Number(elem.year),
        homicides: Number(elem.homicides)
      };
    }).filter(elem => elem.year <= last_year);

  // create svg
  if (main_slide_svg != null) {
    main_slide_svg.remove();
  }

  main_slide_svg = d3.select("#mainSlideDiv")
    .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, SVG_WIDTH, SVG_HEIGHT])
      .style("padding", "50px 50px 20px 20px")
      .style("background", "bisque");

  const x_scale = d3.scaleBand().domain(MAIN_SLIDE_YEARS).range([0, SVG_WIDTH - MAIN_SLIDE_SVG_MARGIN]);
  var x_axis = d3.axisBottom().scale(x_scale);

  const y_scale = d3.scaleLinear().domain([MAIN_SLIDE_SVG_Y_AXIS_MIN, MAIN_SLIDE_SVG_Y_AXIS_MAX]).range([SVG_HEIGHT - MAIN_SLIDE_SVG_MARGIN, 0]);
  var y_axis = d3.axisLeft().scale(y_scale);

  main_slide_svg.append("g").attr("transform", `translate(${MAIN_SLIDE_SVG_MARGIN}, ${SVG_HEIGHT - MAIN_SLIDE_SVG_MARGIN})`)
    .call(x_axis);

  main_slide_svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", SVG_WIDTH)
    .attr("y", SVG_HEIGHT)
    .text("Year");

  main_slide_svg.append("g").attr("transform", `translate(${MAIN_SLIDE_SVG_MARGIN}, 0)`)
    .call(y_axis);

    main_slide_svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("x", 0)
      .attr("y", 15)
      .text("Homicides");

  main_slide_svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x_scale.bandwidth() * (d.year - MIN_YEAR + 0.5) +  MAIN_SLIDE_SVG_MARGIN})
          .y(function(d) { return y_scale(d.homicides) })
        );

  main_slide_svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .style("stroke", "black")
    .style("fill", d => d.year >= first_year && d.year <= last_year ? "orange" : "white")
    .attr("r", 8)
    .attr("cx", d => x_scale.bandwidth() * (d.year - MIN_YEAR + 0.5) + MAIN_SLIDE_SVG_MARGIN)
    .attr("cy", d => y_scale(d.homicides))
    .on("click", d => render_single_year_view(d.target.__data__.year))
    .append("title")
    .text(d => `${d.homicides} homicides reported in ${d.year}`);

  main_slide_svg.append("g").attr("transform", `translate(${2 * MAIN_SLIDE_SVG_MARGIN}, ${SVG_HEIGHT - MAIN_SLIDE_SVG_MARGIN / 3 + 10})`)
      .append("circle")
      .style("stroke", "black")
      .style("fill", "orange")
      .attr("r", 8)
      .attr("cx", d => 0)
      .attr("cy", d => 0)

  main_slide_svg.append("g").attr("transform", `translate(${2 * MAIN_SLIDE_SVG_MARGIN + 16}, ${SVG_HEIGHT - MAIN_SLIDE_SVG_MARGIN / 3 + 16})`)
    .append("text")
    .text(a => first_year == last_year ? "currently highlighted year" : "currently highlighted years");

  append_main_svg_annotations();

  d3.select("#mainSlideAnnotationTitle").text(get_active_slide_title())
  d3.select("#mainSlideAnnotationText1").text(get_active_slide_text_1())
  d3.select("#mainSlideAnnotationText2").text(get_active_slide_text_2())
  d3.select("#mainSlideAnnotationText3").text(get_active_slide_text_3())

}

async function main() {
  await render_slide_number();
  set_active_slide();
}

async function render_single_month_modal(year, month) {
  let data = await d3.csv("./data/chicago_daily_homicide_data.csv");

  data = data.map(elem => {
      return {
        year: Number(elem.year),
        month: Number(elem.month),
        day: Number(elem.day),
        homicides: Number(elem.homicides),
        week_number: Number(elem.week_number),
        day_of_week: Number(elem.day_of_week)
      };
    }).filter(elem => elem.year == year && elem.month == month);

  if (drill_down_month_svg != null) {
    drill_down_month_svg.remove();
  }

  $('#drillDownModalMonth').modal('show');
  $('#drillDownModalMonthTitle').text(map_months([month])[0]+ " " + String(year));

  drill_down_month_svg = d3.select("#drillDownModalMonthBody")
    .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, SVG_WIDTH, SVG_HEIGHT])
      .attr("font-size", "24");

  // create axes
  const week_numbers = [...new Set(data.map(function(elem) { return elem.week_number; }))].sort(function(a, b) { return a - b; })
  const week_days = [...new Set(data.map(function(elem) { return elem.day_of_week; }))].sort(function(a, b) { return a - b; });

  const x_scale = d3.scaleBand().domain(map_days(week_days)).range([0, LEGEND_WIDTH]);
  var x_axis = d3.axisTop().scale(x_scale);

  const y_scale = d3.scaleBand().domain(week_numbers).range([0, LEGEND_WIDTH]);
  var y_axis = d3.axisLeft().scale(y_scale);

  drill_down_month_svg.append("g").attr("transform", `translate(${AXIS_MARGIN}, ${2 * AXIS_MARGIN})`)
    .call(x_axis).attr("font-size", "24");

  drill_down_month_svg.append("g").attr("transform", `translate(${AXIS_MARGIN}, ${2 * AXIS_MARGIN})`)
    .call(y_axis).attr("font-size", "24");
  // create legend
  const max_daily_homicides = d3.max(data.map(elem => elem.homicides));

  const color_scale = d3.scaleLinear().domain([0, max_daily_homicides]).range(['beige', '#FF0000']);
  const legend_data = setup_legend_data(max_daily_homicides);
  const LEGEND_TILE_WIDTH = LEGEND_WIDTH / legend_data.length;
  let legend = drill_down_month_svg.append("g").attr("transform", `translate(${1 * AXIS_MARGIN}, 0)`);

  legend.selectAll("rect")
    .data(legend_data).enter().append("rect")
      .attr("x", function(d, i) { return i * LEGEND_TILE_WIDTH })
      .attr("y", 0)
      .attr("width", LEGEND_TILE_WIDTH)
      .attr("height", LEGEND_TILE_HEIGHT)
      .attr("fill", d => color_scale(d));

  legend.append("text")
    .attr("x", AXIS_MARGIN / 6)
    .attr("y", AXIS_MARGIN / 2)
    .text("0")
    .style("user-select", "none");;

  legend.append("text")
    .attr("x", SVG_WIDTH - 2.4 * AXIS_MARGIN)
    .attr("y", AXIS_MARGIN / 2)
    .text(String(max_daily_homicides))
    .style("user-select", "none");

  legend.append("text")
    .attr("x", LEGEND_WIDTH / 2)
    .attr("y", AXIS_MARGIN)
    .text(String("Reported Daily Homicides"))
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "top")
    .attr("font-size", "16")
    .style("user-select", "none");

  // create visualization of homicides reported in each month from year 2001 to 2020
  drill_down_month_svg.append("g").attr("transform", `translate(0, ${1.8 * AXIS_MARGIN})`)
    .append("text")
    .text("Week # / Day")
    .attr("font-size", "9")
    .style("user-select", "none");

  drill_down_month_svg.append("g").attr("transform", `translate(${AXIS_MARGIN}, ${2 * AXIS_MARGIN})`)
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", d => x_scale.bandwidth() * ((d.day_of_week + 1) % DAYS_IN_WEEK) + TILE_MARGIN)
      .attr("y", d => y_scale.bandwidth() * (d.week_number - MIN_WEEK_NUMBER) + TILE_MARGIN)
      .attr("width", x_scale.bandwidth() - TILE_MARGIN)
      .attr("height", y_scale.bandwidth() - TILE_MARGIN)
      .attr("fill", d => color_scale(d.homicides))
      .style("margin-top", TILE_MARGIN)
      .style("margin-left", TILE_MARGIN)
      .append("title")
      .text(d => `${d.homicides} homicides reported on ${map_months([d.month])[0]} ${d.day}, ${d.year}`);

  let total_homicides = data.reduce(function(total, current) { return total + current.homicides }, 0);
  let days_with_most_homicides = data.filter(elem => elem.homicides == max_daily_homicides).map(elem => String(elem.day));

  d3.select("#drillDownModalMonthAnnotation1").style("font-size", "12px").text("Total homicides reported: " + String(total_homicides));
  d3.select("#drillDownModalMonthAnnotation2").style("font-size", "12px").text("Day(s) with most homicides: " + days_with_most_homicides.join(', '));
}

async function render_single_year_view(year) {
  let data = await d3.csv("./data/chicago_daily_homicide_data.csv");

  data = data.map(elem => {
      return {
        year: Number(elem.year),
        month: Number(elem.month),
        day: Number(elem.day),
        homicides: Number(elem.homicides),
        week_number: Number(elem.week_number),
        day_of_week: Number(elem.day_of_week)
      };
    }).filter(elem => elem.year == year);

  if (drill_down_year_svg != null) {
    drill_down_year_svg.remove();
  }

  $('#drillDownModalYear').modal('show');
  $('#drillDownModalYearTitle').text("Year " + String(year));

  drill_down_year_svg = d3.select("#drillDownModalYearBody")
    .append("svg")
      .attr("width", "100%")
      .attr("height", "66%")
      .attr("viewBox", [0, 0, SVG_WIDTH, SVG_HEIGHT]);

  // create axes
  const months_in_year = [...new Set(data.map(function(elem) { return elem.month; }))].sort(function(a, b) { return a - b; })
  const days_of_month = [...new Set(data.map(function(elem) { return elem.day; }))].sort(function(a, b) { return a - b; });

  const x_scale = d3.scaleBand().domain(days_of_month).range([0, LEGEND_WIDTH]);
  var x_axis = d3.axisTop().scale(x_scale);

  const y_scale = d3.scaleBand().domain(map_months(months_in_year)).range([0, LEGEND_WIDTH]);
  var y_axis = d3.axisLeft().scale(y_scale);

  drill_down_year_svg.append("g").attr("transform", `translate(${AXIS_MARGIN}, ${2 * AXIS_MARGIN})`)
    .call(x_axis);

  drill_down_year_svg.append("g").attr("transform", `translate(0, ${2 * AXIS_MARGIN})`)
    .selectAll("rect")
    .data(months_in_year)
    .enter().append("rect")
      .attr("x", AXIS_MARGIN / 2)
      .attr("y", d => y_scale.bandwidth() * (d - 1) + 5)
      .attr("width", 24)
      .attr("height", y_scale.bandwidth() - 10)
      .attr("rx", 5)
      .on("click", d => render_single_month_modal(year, d.target.__data__))
      .attr("class", "monthButton");

  total_homicides_per_month = months_in_year.map(month => {
    return { month: month,
             homicides: data.filter(d => d.month == month && d.year == year)
              .reduce(function(total, current) { return total + current.homicides; }, 0)
           };
    });

  drill_down_year_svg.append("g").attr("transform", `translate(${LEGEND_WIDTH}, ${2 * AXIS_MARGIN})`)
    .selectAll("text")
    .data(months_in_year)
    .enter().append("text")
      .attr("x", AXIS_MARGIN + 5)
      .attr("y", -5)
      .attr("font-size", 8)
      .text("Monthly");

      drill_down_year_svg.append("g").attr("transform", `translate(${LEGEND_WIDTH}, ${2 * AXIS_MARGIN})`)
        .selectAll("text")
        .data(months_in_year)
        .enter().append("text")
          .attr("x", AXIS_MARGIN + 5)
          .attr("y", 5)
          .attr("font-size", 8)
          .text("Homicides");

  drill_down_year_svg.append("g").attr("transform", `translate(${LEGEND_WIDTH}, ${2 * AXIS_MARGIN})`)
    .selectAll("text")
    .data(months_in_year)
    .enter().append("text")
      .attr("x", AXIS_MARGIN + 5)
      .attr("y", d => y_scale.bandwidth() * (d - MIN_MONTH) + AXIS_MARGIN / 2)
      .text(d => String(total_homicides_per_month.filter(elem => elem.month == d)[0].homicides));


  drill_down_year_svg.append("g").attr("transform", `translate(${AXIS_MARGIN}, ${2 * AXIS_MARGIN})`)
    .call(y_axis).on("click", d => render_single_month_modal(year, MONTH_MAPPING.indexOf(d.target.lastChild.data)));
  // create legend
  const max_daily_homicides = d3.max(data.map(elem => elem.homicides));

  const color_scale = d3.scaleLinear().domain([0, max_daily_homicides]).range(['beige', '#FF0000']);
  const legend_data = setup_legend_data(max_daily_homicides);
  const LEGEND_TILE_WIDTH = LEGEND_WIDTH / legend_data.length;
  let legend = drill_down_year_svg.append("g").attr("transform", `translate(${1 * AXIS_MARGIN}, 0)`);

  legend.selectAll("rect")
    .data(legend_data).enter().append("rect")
      .attr("x", function(d, i) { return i * LEGEND_TILE_WIDTH })
      .attr("y", 0)
      .attr("width", LEGEND_TILE_WIDTH)
      .attr("height", LEGEND_TILE_HEIGHT)
      .attr("fill", d => color_scale(d));

  legend.append("text")
    .attr("x", AXIS_MARGIN / 6)
    .attr("y", AXIS_MARGIN / 2)
    .text("0")
    .style("user-select", "none");;

  legend.append("text")
    .attr("x", SVG_WIDTH - 2.4 * AXIS_MARGIN)
    .attr("y", AXIS_MARGIN / 2)
    .text(String(max_daily_homicides))
    .style("user-select", "none");

  legend.append("text")
    .attr("x", LEGEND_WIDTH / 2)
    .attr("y", AXIS_MARGIN)
    .text(String("Reported Daily Homicides"))
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "top")
    .style("user-select", "none");

  // create visualization of homicides reported in each month from year 2001 to 2020
  drill_down_year_svg.append("g").attr("transform", `translate(0, ${1.8 * AXIS_MARGIN})`)
    .append("text")
    .text("Month / Day #")
    .attr("font-size", 8)
    .style("user-select", "none");

  drill_down_year_svg.append("g").attr("transform", `translate(${AXIS_MARGIN}, ${2 * AXIS_MARGIN})`)
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", d => x_scale.bandwidth() * (d.day - MIN_DAY) + TILE_MARGIN)
      .attr("y", d => y_scale.bandwidth() * (d.month - MIN_MONTH) + TILE_MARGIN)
      .attr("width", x_scale.bandwidth() - TILE_MARGIN)
      .attr("height", y_scale.bandwidth() - TILE_MARGIN)
      .attr("fill", d => color_scale(d.homicides))
      .style("margin-top", TILE_MARGIN)
      .style("margin-left", TILE_MARGIN)
      .append("title")
      .text((d, i) => `${data[i].homicides} homicides reported on ${map_months([data[i].month])[0]} ${data[i].day}, ${data[i].year}`)

  let homicides_in_year = data.reduce(function(total, current) { return total + current.homicides; }, 0);
  let max_homicides_in_month = d3.max(total_homicides_per_month.map(elem => elem.homicides));
  let months_with_most_homicides = map_months(
    total_homicides_per_month.filter(elem => elem.homicides == max_homicides_in_month).map(elem => elem.month)
  );
  let days_with_most_homicides = data.filter(elem => elem.homicides == max_daily_homicides).map(elem => String(MONTH_MAPPING[elem.month]) + " " + String(elem.day));

  d3.select("#drillDownModalYearAnnotation1").style("font-size", "12px").text("Total homicides reported: " + String(homicides_in_year));
  d3.select("#drillDownModalYearAnnotation2").style("font-size", "12px").text("Month(s) with most homicides: " + months_with_most_homicides.join(', '));
  d3.select("#drillDownModalYearAnnotation3").style("font-size", "12px").text("Day(s) with most homicides: " + days_with_most_homicides.join(', '));


}
