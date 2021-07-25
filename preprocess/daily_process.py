
import csv
import datetime

SUNDAY = 6

def find_week_of_month(year, month, day):
    first_day_of_month_date = datetime.datetime(year, month, 1)

    # 0 index for first week
    second_week_start_day = None
    if first_day_of_month_date.weekday() == SUNDAY:
        second_week_start_day = 8
    else:
        current_date = datetime.datetime(year, month, 2)

        while current_date.weekday() != SUNDAY:
            current_date += datetime.timedelta(days=1)

        second_week_start_day = current_date.day

    week_number = 1
    next_week_start = second_week_start_day

    while True:
        if day < next_week_start:
            break
        week_number += 1
        next_week_start += 7

    return week_number

def initialize_year_month_day_to_homicides_map():
    year_month_day_to_homicides_map = {}

    date = datetime.date(2001,1,1)

    while True:
        year = date.year
        month = date.month
        day = date.day
        year_month_day_to_homicides_map[(year, month, day)] = 0

        date += datetime.timedelta(days=1)
        if date.year == 2021:
            break

    return year_month_day_to_homicides_map

def populate_year_month_day_to_homicides_map(year_month_day_to_homicides_map, fields, rows):
    date_index = fields.index('Date')
    date_format = "%m/%d/%Y"

    for row in rows:
        date_string = row[date_index].split(' ')[0]
        date = datetime.datetime.strptime(date_string, date_format)
        year = date.year
        month = date.month
        day = date.day

        if year >= 2001 and year < 2021:
            year_month_day_to_homicides_map[(year, month, day)] += 1

def preprocess_helper(filename, new_filename, new_fields):
    fields = []
    rows = []

    with open(filename) as csvfile:
        csvreader = csv.reader(csvfile, delimiter=",")

        fields = next(csvreader)

        for row in csvreader:
            rows.append(row)

    year_month_day_to_homicides_map = initialize_year_month_day_to_homicides_map()
    populate_year_month_day_to_homicides_map(year_month_day_to_homicides_map, fields, rows)

    final_rows = []
    date = datetime.date(2001,1,1)

    while True:
        year = date.year
        month = date.month
        day = date.day

        final_rows.append([year, month, day,
            find_week_of_month(year, month, day), date.weekday(),
            year_month_day_to_homicides_map[(year, month, day)]
            ])

        date += datetime.timedelta(days=1)
        if date.year == 2021:
            break

    with open(new_filename, 'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(new_fields)
        csvwriter.writerows(final_rows)

def preprocess():
    filename = "data/chicago_homicide_data.csv"
    new_filename = "data/chicago_daily_homicide_data.csv"
    new_fields = ["year", "month", "day", "week_number", "day_of_week", "homicides"]
    preprocess_helper(filename, new_filename, new_fields)

if __name__ == "__main__":
    preprocess()
