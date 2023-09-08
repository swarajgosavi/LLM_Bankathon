import re
from typing import List
from typing import Tuple

from pyrebase.pyrebase import Firebase

sentence_regex = re.compile( r"(?:\.|\?|!)(?: \n?)?" )

def get_score_enhancement( response: str ) -> Tuple[ int , str ]:
    lines = [ line for line in response.split( "\n" ) if len( line.strip() ) != 0 ]
    score = re.findall( r'\d+', lines[0] )[0]
    score = int( score )
    enhancement = response.split( "Enhancements:" )[1].strip()
    return score , enhancement

def get_score( response: str ) -> int:
    print( response )
    lines = [line for line in response.split("\n") if len(line.strip()) != 0]
    score = re.findall(r'\d+', lines[0])[0]
    score = int(score)
    return score

def list_user_cvs( firebase: Firebase, user_id: str ) -> List[str]:
    files = firebase.storage().child("cv", user_id).list_files()
    paths = [
        file.name for file in files
        if str(file.name).startswith( "cv/{}".format( user_id ) ) and str(file.name).endswith( "pdf" )
    ]
    return paths


if __name__ == "__main__":
    output = get_score_enhancement(
    """
    Score: 7/10

Enhancements:

1. **More Specific Technologies**: The job description mentions experience with "Hybrid: Android and iOS" but doesn't clearly specify the technologies required for hybrid app development. It should explicitly mention React Native or any other specific framework used for hybrid development.

2. **Seniority Level**: While the job title mentions "Senior Mobile Application Developer," the experience requirement is only stated as "5 years' experience." Providing a clearer indication of the expected seniority level (e.g., senior, lead, etc.) can help attract candidates with the right level of expertise.

3. **Focus on Android Development**: Since the job title is "Android Developer," the description should place more emphasis on Android-specific skills and responsibilities. While cross-platform knowledge is valuable, the Android development aspects should be highlighted more prominently.

4. **Clearer Company Information**: The job description refers to "Our Client," but it's not evident who the client is. Including the actual name and background of the company can provide better context to potential candidates.

5. **Location Flexibility**: Specify whether the role requires the candidate to work on-site at a specific location or if remote work options are available.

6. **Team Size and Structure**: Mentioning the size and structure of the team the candidate will lead can give applicants a better idea of the leadership responsibilities.

7. **Project Scope**: Including a brief overview of the types of projects the candidate will be involved in can help candidates assess their fit for the role.

8. **Benefits and Perks**: Adding information about the company's benefits package and any unique perks offered can make the job posting more enticing.

9. **Career Growth Opportunities**: Highlighting potential career growth paths within the organization can attract candidates looking for long-term opportunities.

10. **Company Culture**: Including a brief description of the company's culture, values, and work environment can help candidates determine if it aligns with their preferences.

11. **Application Deadline**: Providing a clear deadline for application submission can create a sense of urgency for interested candidates.

12. **Responsibility Breakdown**: Consider breaking down the roles and responsibilities into essential and preferred qualifications to help applicants gauge their suitability.

Overall, the job description provides a good overview of the role but could be improved by incorporating the suggested enhancements to make it more appealing to potential Android Developer candidates.
    """
)
    print( output[0] )
    print( output[1] )