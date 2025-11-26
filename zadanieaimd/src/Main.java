import javax.swing.*;
import java.awt.*;

class Main {
    public static void main(String[] args) {
        EventQueue.invokeLater(() -> {
            new PPO();
            new LayoutManagers();
            new JPanel();
            new JComponent();
            new Z_przyciski();
            new Z_klawiatura();
            new Z_mysz();
            new Napisy();
            new Obrazki();
        });
    }
}