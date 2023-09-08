from task_prompts import PromptBuilder
from task_prompts import Tasks

print(PromptBuilder.build(Tasks.SCORE_JOB_DESC_WITH_TITLE, "Android dev", "My resume content"))