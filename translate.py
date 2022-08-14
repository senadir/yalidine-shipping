from os import environ

from google.cloud import translate

project_id = environ.get("PROJECT_ID", "")
assert project_id
parent = f"projects/{project_id}"
client = translate.TranslationServiceClient()

sample_text = "Mazouna"
target_language_code = "ar"

response = client.translate_text(
    contents=[sample_text],
		source_language_code="en",
    target_language_code=target_language_code,
    parent=parent,
)

for translation in response.translations:
    print(translation.translated_text)