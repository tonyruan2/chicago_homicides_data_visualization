
import csv
import datetime

def initialize_year_month_to_homicides_map():
    year_month_to_homicides_map = {}

    for year in range(2001, 2021):
        for month in range(1, 13):
             year_month_to_homicides_map[(year, month)] = 0

    return year_month_to_homicides_map

def populate_year_month_to_homicides_map(year_month_to_homicides_map, fields, rows):
    date_index = fields.index('Date')
    date_format = "%m/%d/%Y"

    for row in rows:
        date_string = row[date_index].split(' ')[0]
        date = datetime.datetime.strptime(date_string, date_format)
        year = date.year
        month = date.month

        if year >= 2001 and year < 2021:
            year_month_to_homicides_map[(year, month)] += 1

def preprocess_helper(filename, new_filename, new_fields):
    fields = []
    rows = []

    with open(filename) as csvfile:
        csvreader = csv.reader(csvfile, delimiter=",")

        fields = next(csvreader)

        for row in csvreader:
            rows.append(row)

    year_month_to_homicides_map = initialize_year_month_to_homicides_map()
    populate_year_month_to_homicides_map(year_month_to_homicides_map, fields, rows)

    final_rows = []
    for year in range(2001, 2021):
        for month in range(1, 13):
            final_rows.append([year, month, year_month_to_homicides_map[(year, month)]])

    with open(new_filename, 'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(new_fields)
        csvwriter.writerows(final_rows)

def preprocess():
    filename = "data/chicago_homicide_data.csv"
    new_filename = "data/chicago_monthly_homicide_data.csv"
    new_fields = ["year", "month", "homicides"]
    preprocess_helper(filename, new_filename, new_fields)

if __name__ == "__main__":
    preprocess()
