import json
import re
from typing import Dict

# Finds a number from response
# and returns it
def parse_score( response: str ) -> Dict[str, str]:
    lines = [line for line in response.split("\n") if len(line.strip()) != 0]
    score = re.findall(r'\d+', lines[0])[0]
    score = int(score)
    return { "score" : str(score) }

# Convert response (JSON string)
# to a Python dict
def parse_json_as_dict(response: str) -> Dict[str,str]:
    output_dict = json.loads( response )
    return output_dict

# Parse a yes/no response
def parse_yes_no(response: str) -> Dict[str,str]:
    return { "response" : response.lower() }
