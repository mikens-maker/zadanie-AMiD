import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class Obrazki extends JFrame {

    public Obrazki() {
        super("Okno 8: Wyświetlanie Obrazu");
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setSize(400, 300);
        setLocation(750, 400);

        JPanel panel = new JPanel() {
            private Image image;
            {
                try {
                    image = ImageIO.read(new File("image.png"));
                } catch (IOException e) {
                    System.err.println("Błąd wczytywania obrazu: upewnij się, że plik 'image.png' istnieje.");
                    image = null;
                }
            }
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                if (image != null) {
                    g.drawImage(image, 0, 0, this);
                } else {
                    g.drawString("BRAK PLIKU OBRAZU", 50, 50);
                }
            }
        };
        add(panel);
        setVisible(true);
    }
}