from cv_handler import CVHandler

scores = CVHandler.score_cvs( "JkDgBJKaFpdohDbE7IupoCl4pfT2" , "" , open( "samples/job_description.txt").read() )
for ( downloaded_cv , score ) in scores:
    print( score )
    print( downloaded_cv.local_filepath )