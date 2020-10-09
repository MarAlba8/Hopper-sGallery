var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE item (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            description text, 
            range integer,
            image text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO item (title, description, range, image) VALUES (?,?,?,?)'
                db.run(insert, ["Nighthawks","Edward Hopper said that Nighthawks was inspired by “a restaurant on New York’s Greenwich Avenue where two streets meet,” but the image—with its carefully constructed composition and lack of narrative—has a timeless, universal quality that transcends its particular locale. One of the best-known images of twentieth-century art, the painting depicts an all-night diner in which three customers, all lost in their own thoughts, have congregated. Hopper’s understanding of the expressive possibilities of light playing on simplified shapes gives the painting its beauty. Fluorescent lights had just come into use in the early 1940s, and the all-night diner emits an eerie glow, like a beacon on the dark street corner. ",5, "https://ep01.epimg.net/elpais/imagenes/2020/06/26/eps/1593192585_389847_1593193197_noticia_normal.jpg"])
                db.run(insert, ["Chop Suey (1929)","The scene depicts two women at a table in a restaurant with another couple in the background. The only features being shown in particular detail are the painted woman’s face, the coat hanging above her, her companion’s back [to the viewer], the features of the couple in the background, the tea pot on the table, the masked lower window panel, and the restaurant sign outside. These are all features that would bring a sensory element (besides sight) to the memory painted: the buzzing noise of the outside light, the voices of the people in the background, the texture of the coat, the taste of the tea and smell of the cigarette smoke (held by the man), and the muddled light from the masked window.",4,"https://cdn.forbes.com.mx/2018/11/chop-640x360.jpg"])
                db.run(insert, ["Second Story Sunlight","It depicts two women of different ages on the second-story balcony of a white house. The older woman reads a newspaper while the younger woman sits on the railing. According to Hopper, the painting was \"an attempt to paint sunlight as white with almost no yellow pigment in the white\", and \"any psychological idea will have to be supplied by the viewer\". Hopper's wife Josephine posed for both women in the picture. This was disputed by Hopper's neighbors, Marie Stephens and her adolescent daughter Kim, who argued that the young woman must have been based on one of them, citing the depicted woman's bust size. The painting was finished on September 15, 1960.",4,"https://loff.it/wp-content/uploads/2020/01/loffit-edward-hopper-05-600x450.jpg"])
                db.run(insert, ["Room in New York","The scene of a brightly lit room is contained within the dark sill of a window. The stark framing makes the room the main focus, drawing the eye and giving realness to the action of peeping into a space where the subjects are unaware they are being watched. The genuineness of spying is a product of Hopper’s artistic process. He admitted the inspiration for Room in New York came from \"glimpses of lighted interiors seen as I walked along city streets at night.\" Despite the snapshot-esque quality of the scene, it is actually no one particular window or moment Hopper peered into but rather a culmination of many different narratives he saw as he roamed New York City. The act of peering gives the viewer the sense that what is being seen is wholly real and unfiltered; “the self-absorbed figures do not know of his presence; otherwise, they would be embarrassed, startled, or otherwise uncomfortable.” Thus, the narrative Hopper portrays is one of unapologetic realness. The harsh lines and blocks of color that frame the scene not only divide the space between viewer and subject but also divide space within the room itself. Hopper places a door almost exactly center to divide the work into two distinct halves horizontally, isolating the man and the woman into their respective sides. While the man reads the newspaper, his counterpart plays the piano with her back to him. Blocks of color delineate space and suggest a lack of movement. Art historian and scholar Jean Gillies argues that the less details the viewer has to look at, the slower the eye will move across the work. The idea comes from the notion that when viewing a work of art, the eye jumps from detail to detail in order to perceive the whole. By reducing the number of elements, Hopper creates a slow moving or even still scene. Gilles argues the formal techniques function to give the subjects a timeless quality as if they are frozen in that instant.",4,"https://ep00.epimg.net/cultura/imagenes/2012/12/16/actualidad/1355650891_045551_1355651250_noticia_normal.jpg"])
                db.run(insert, [" People in the Sun ","In Edward Hopper’s People in the Sun, five men and women sit on a terrace beneath a vast blue sky. Stark contrasts and cool light emphasize the eerie expressions, frozen poses, and formal attire of the visitors. Hopper distilled his memories of tourist destinations in the American West to create a scene that is strangely familiar but nowhere in particular. The precisely staggered deck chairs and bands of color indicating mountains, sky, and grass create an abstracted environment that veers between a real view and a stage set, as if Hopper were replaying a silent film of a family vacation. People in the Sun suggests a crowd of tourists who feel obliged to take in a famous scenic view, but do so with little pleasure. The canvas may reflect Hopper’s discomfort in the West, where he found himself unable to paint with his usual enthusiasm when confronted by the harsh light and monumental landscapes.",5,"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSbt6VNkVWn2pGzNrnYPsBdsQjRLrqg_yhr3w&usqp=CAU"])
                db.run(insert, ["Gas","The subject was a composite of several gas stations Hopper had visited. According to Hopper's wife, the gas station motif was something he had wanted to paint for a long time. Hopper struggled with the painting. He had begun to produce new paintings at a slower rate than before, and had trouble finding suitable gas stations to paint. Hopper wanted to paint a station with the lights lit above the pumps, but the stations in his area only turned the lights on when it was pitch dark outside, to save energy",5,"https://loff.it/wp-content/uploads/2020/01/loffit-edward-hopper-04.jpg"])
                
               	db.run(`CREATE TABLE comments (
            	id INTEGER PRIMARY KEY AUTOINCREMENT,
            	id_image integer, 
            	comment text
            	)`,
        		(err) => {
            		if (err) {
                		// Table already created
            		}else{
                		// Table just created, creating some rows
                		var insert = 'INSERT INTO comments (id_image, comment) VALUES (?,?)'
                		db.run(insert, [1,"beautiful"])
                		db.run(insert, [2,"awesome"])
                		db.run(insert, [1,"awesome"])
            		}
        		});  
            }
        });  
    }
});


module.exports = db
