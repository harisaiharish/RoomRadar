import requests
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

params = {
    'api_key_private': 'pri_ae0926ab25dd4745a238312869f2fe72',
    'venue_id': 'ven_597a716a47425a634d786352676f4539666a512d5577424a496843'
}
venue_ids = {"Wilmeth Active Learning Center (WALC)": "ven_597a716a47425a634d786352676f4539666a512d5577424a496843",
             "Humanities, Social Science, and Education Library (HSSE)": "ven_6762676f5551574a71353952676f4569487237504f78354a496843",
            "John W. Hicks Undergraduate Library": "ven_6b72414b7532714d55507252676f4569487233474d62564a496843",
            "Krach Leadership Center": "ven_384e37574c415a646c6e4352676f45695872765f412d424a496843",
            "West Lafayette Public Library": "ven_63726241747435324a5a6452676f45693761704e46526b4a496843"}
jsons = [['temp', 'temp'] for i in range(5)]

for i in range(5):
  params['venue_id'] = venue_ids[list(venue_ids.keys())[i]]
  for j in range(2):
    if j == 1:
      jsons[i][j] = requests.request("POST", "https://besttime.app/api/v1/forecasts", params=params).json()
    else:
      jsons[i][j] = requests.request("POST", "https://besttime.app/api/v1/forecasts/live", params=params).json()

index = 0
if jsons[2][0]['venue_info']['venue_current_gmttime'].split()[0] == 'Sunday':
  index = 6
elif jsons[2][0]['venue_info']['venue_current_gmttime'].split()[0] == 'Monday':
  index = 0
elif jsons[2][0]['venue_info']['venue_current_gmttime'].split()[0] == 'Tuesday':
  index = 1
elif jsons[2][0]['venue_info']['venue_current_gmttime'].split()[0] == 'Wednesday':
  index = 2
elif jsons[2][0]['venue_info']['venue_current_gmttime'].split()[0] == 'Thursday':
  index = 3
elif jsons[2][0]['venue_info']['venue_current_gmttime'].split()[0] == 'Friday':
  index = 4
else:
  index = 5

for i in range(5):
  if jsons[i][0]['status'] == "Error":
    print(list(venue_ids.keys())[i] + " is currently closed, please check in again later for business data!")
    jsons.remove(jsons[i])
    venue_ids.pop(venue_ids.keys()[i])

if len(jsons) == 0:
  exit(0)

time = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a" ,"8a", "9a", "10a", "11a"]
for i in range(12):
  time.append(time[i][0:-1] + "p")
days_data = []
current_business = []
current_time = jsons[0][0]['analysis']['hour_start']
live = [[0 for i in range(24)] for j in range(len(jsons))]

for place in range(len(jsons)):
  days_data.append([jsons[place][1]['analysis'][index]['day_raw'][i - 6] for i in range(24)])
  current_business.append(jsons[place][1]['analysis']['venue_live_busyness'])
  live[place][current_time] = current_business[place]

categories = time
counter = 0

for i in list(venue_ids.keys()):
  typical_values = days_data[counter] # typical values for each time
  current_values = live[counter]  # current values

  print('Times are for ' + i)
  counter += 1

  # Set up the plot
  fig, ax = plt.subplots(figsize=(8, 6))

  # Plot typical values
  sns.barplot(x=categories, y=typical_values, color="royalblue", ax=ax, label="Typical", alpha=0.4)

  # Plot current values, slightly offset by using the same x-coordinates
  sns.barplot(x=categories, y=current_values, color="red", ax=ax, label="Current", alpha=0.7)

  # Add legend and labels
  plt.legend([],[], frameon=False)

  ax.set(xticks=time[::3])
  ax.set(yticklabels=[])  # remove the tick labels
  ax.set(ylabel=None)  # remove the axis label
  ax.tick_params(left=False)  # remove the ticks
  ax.spines['top'].set_visible(False)
  ax.spines['right'].set_visible(False)
  ax.spines['bottom'].set_visible(False)
  ax.spines['left'].set_visible(False)
  plt.ylim([0, 100])


  new_patches = []
  for patch in reversed(ax.patches):
      bb = patch.get_bbox()
      if bb.y1 == 0:
        continue
      color=patch.get_facecolor()
      
      p_bbox = FancyBboxPatch((bb.xmin - 0.1, bb.ymin),
                          abs(bb.width + 0.2), abs(bb.height),
                          boxstyle="round,pad=-0.0040,rounding_size=0.25",
                          ec="none", fc=color,
                          mutation_aspect=4
                          )
                          
      patch.remove()
      new_patches.append(p_bbox)
  for patch in new_patches:
      ax.add_patch(patch)

# Show the plot
plt.show()